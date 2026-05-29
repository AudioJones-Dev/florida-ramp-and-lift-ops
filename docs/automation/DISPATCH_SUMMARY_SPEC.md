# DISPATCH SUMMARY — SPEC

**Status:** Phase 1 specification. Implementation lands in Phase 2.
**Purpose:** Generate a per-crew, per-day dispatch summary so crews show up to each job knowing exactly what to do, what to bring, and what to watch for.

---

## 1. Input contract

| Property | Value |
|---|---|
| Trigger | Daily dispatch run (admin-configured time) OR ad-hoc for last-minute schedule changes |
| Input | Set of jobs with status `scheduled` for a target date + target crew |
| Required job fields | All required-on-submission fields plus: `crew_members[]`, `scheduled_date`, `site_address`, `scope_line_items[]`, `safety_record_id`, `site_access_notes` (optional) |

---

## 2. Output contract

One dispatch summary document per crew per date.

```json
{
  "dispatch_summary_id": "<uuid>",
  "generated_at": "<iso-8601-datetime>",
  "crew": {
    "lead_contractor_id": "<ref>",
    "crew_members": [{"contractor_id": "<ref>", "role": "<lead|helper|...>"}]
  },
  "date": "<iso-8601-date>",
  "jobs_in_sequence": [
    {
      "job_id": "<ref>",
      "sequence_position": 1,
      "client_name": "<e.g., WillScot>",
      "site_address": "<full address>",
      "site_city": "<city>",
      "zone_id": "<zone_1|zone_2|...>",
      "trip_charge_classification": "<first|additional|none>",
      "eta_window": "<e.g., 09:00–10:00>",
      "contact_name": "<name>",
      "contact_phone": "<phone>",
      "site_access_notes": "<gate codes, etc.>",
      "scope_summary": [
        {"name": "<canonical line item>", "quantity": "<number>"}
      ],
      "ppe_requirements": ["steel_toed_boots", "safety_glasses", "gloves", "..."],
      "job_specific_hazards": ["working_at_height", "electrical", "..."],
      "materials_needed": ["<material 1>", "<material 2>"],
      "tools_needed": ["<tool 1>", "<tool 2>"],
      "signoff_requirements": "<what to capture: signed completion form, photos, etc.>",
      "special_notes": "<freeform>"
    }
  ],
  "day_summary": {
    "total_jobs": "<integer>",
    "zones_visited": ["<zone>"],
    "estimated_total_drive_time": "<minutes>",
    "estimated_total_work_time": "<minutes>",
    "weather_forecast": "<freeform if available>",
    "safety_advisories": ["<heat advisory active>", "<storm risk PM>"]
  },
  "delivery_channels": ["email", "sms_with_link", "in_app_phase_2"],
  "delivered_to": [{"contractor_id": "<ref>", "delivered_at": "<datetime>"}]
}
```

---

## 3. Generation logic

For each job assigned to the crew on the target date:

1. **Pull job + client + work order + safety record + zone.**
2. **Compute trip-charge classification** based on the crew's other jobs the same day in the same zone.
3. **Derive PPE requirements** from job type (always includes the three mandatory items: steel-toed boots, real safety glasses, gloves) plus job-specific PPE (hard hat for overhead loads, hi-vis for roadside, hearing protection for power tools, respirator/N95 for dust).
4. **Derive job-specific hazards** from job type + site context (working at height for ramp install with stairs, electrical for VPL install, etc.).
5. **Derive materials needed** from line items + quantities.
6. **Derive tools needed** from job type (standard tool kit per type).
7. **Sequence jobs** by geography (minimize drive time) unless admin override.
8. **Estimate ETAs + drive time + work time.**
9. **Pull weather + safety advisories** if available (Florida sun, heat advisory, storms).

---

## 4. Sequencing logic

Jobs are sequenced to minimize crew drive time while respecting:

- **Time windows** if the client specified one (e.g., "must arrive between 8–10 AM").
- **Customer access constraints** (commercial site only accessible after 8 AM).
- **Zone clustering** — keep same-zone jobs together to maximize the additional-same-day-same-zone trip charge benefit (per Florida Ramp pricing).
- **Lead time** for the first job of the day relative to the crew's start location.

Admin can override the sequence with a reason.

---

## 5. PPE derivation rules

The dispatch summary always lists the three mandatory PPE items:

- steel_toed_boots
- safety_glasses (ANSI Z87+ — actual safety glasses, not sunglasses, not corrective lenses without Z87 marking)
- gloves

Additional PPE is added per job context:

| Context | Add PPE |
|---|---|
| Working at height (any stairs / decks / scaffolding) | hard_hat, fall_protection_if_above_6ft |
| Roadside / equipment yard | hi_vis_vest |
| Power tool operation > 1 hour sustained | hearing_protection |
| Cutting / grinding / dust | respirator_or_n95 |
| Electrical work (VPL, lift install with electrical) | insulated_gloves, lockout_tagout_kit |

---

## 6. Job-specific hazard derivation

Per job type, the dispatch summary surfaces typical hazards (from `SAFETY_REQUIREMENTS_SOP.md` § 3):

| Job type | Hazards |
|---|---|
| `ramp_install` | working_at_height, sharp_aluminum_edges, pinch_points, soft_ground, power_tools |
| `vpl_install` | electrical_connection, heavy_lift_components, pinch_points, dust |
| `stair_lift_install` | working_on_stairs, electrical, drilling_into_masonry |
| `knockdown_or_return` | loading_heavy_components, strain_risk, sharp_edges, load_securing |
| All Florida jobs | heat_dehydration, sun_exposure, wildlife (snakes, fire ants, wasps), customer_presence |

---

## 7. Materials + tools derivation

For each line item, look up the materials needed (Phase 2+ admin-maintained mapping):

- "ADA/IBC Switchback Ramp" → switchback ramp kit (lengths per quantity), handrails, fasteners
- "Aluminum Deck – 5ft × 5ft" → deck panels, brackets
- etc.

For each job type, look up the tools needed (Phase 2+ admin-maintained):

- `ramp_install` → drills, drivers, levels, tape, square, hex drivers, saw if cuts expected
- `vpl_install` → standard tool kit + electrical kit + lift-specific install kit
- etc.

---

## 8. Review gates

Dispatch summary is sent to the crew automatically once generated.

**Admin override required for:**

- Manual sequence change
- PPE override (e.g., removing a PPE requirement — should be rare and explicitly logged)
- Hazard list override
- Adding / removing materials or tools that differ from the type-default

---

## 9. Failure handling

| Failure | Behavior |
|---|---|
| Job missing required fields | Skip the job; flag for admin; remove from dispatch summary; rest of summary generates |
| Crew not assigned | Block summary generation; alert admin |
| Site address not geocodable | Include job but flag zone + sequence as `unknown`; surface to admin |
| Weather feed unavailable | Generate summary without weather; flag info-level |

---

## 10. Delivery

Summary is delivered to each crew member:

- Email (PDF + structured JSON)
- SMS with secure link (Phase 2+)
- In-app push notification (Phase 2+)

Each delivery is tracked: sent / delivered / viewed timestamps.

---

## 11. Reusable prompt

Summary generation uses `prompts/dispatch/generate-dispatch-summary.prompt.md`. Same contract pattern as the PDF intake parser: prompt defines the LLM behavior; schemas validate the output.

---

## 12. Out of scope

- ❌ Real-time GPS dispatch (Phase 3+)
- ❌ Dynamic re-routing mid-day (Phase 3+)
- ❌ Multi-day dispatch (this spec is single-day per crew)
- ❌ Inter-crew handoffs (Phase 3+)

---

## 13. Open questions for Audio

1. Confirm typical workday window (start / end times) for Florida Ramp crews.
2. Confirm whether dispatch should optimize for same-day-same-zone trip-charge maximization or for crew drive-time minimization (they sometimes conflict).
3. Confirm crews-per-day cap (do we ever assign one crew to 5+ jobs?).
4. Confirm preferred dispatch delivery channel for Phase 1 (email PDF acceptable as MVP?).
5. Confirm weather feed integration timing — Phase 2 must-have or Phase 3+ nice-to-have?
