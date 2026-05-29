# SAFETY REQUIREMENTS — SOP

**Audience:** Every contractor, apprentice, and crew lead on every Florida Ramp & Lift job.
**Authority:** This SOP is non-negotiable. No job moves out of `pending` or `scheduled` without PPE check + hazard review + sign-off.
**Field-friendly:** Print this. Tape it inside the truck. Reference it before every job.

---

## 1. PPE — Required on every job

Before you touch the work, confirm you have and are wearing:

- [ ] **Steel-toed boots.** Not work boots — steel-toed. No exceptions.
- [ ] **Actual safety glasses.** Not sunglasses. Not corrective lenses. Real ANSI Z87+ safety glasses. (Prescription safety glasses are acceptable if they carry the ANSI Z87+ marking.)
- [ ] **Gloves.** Cut-resistant or work gloves appropriate for the materials being handled.

**These three items are mandatory.** If you do not have them, you do not start the work. Call the lead; reschedule if needed.

Additional PPE when applicable:

- [ ] **Hard hat** when working below overhead loads, near scaffolding, or on a site that requires it.
- [ ] **Hi-vis vest** when working roadside, in active equipment yards, or where required by the site.
- [ ] **Hearing protection** when operating power tools for sustained periods.
- [ ] **Respirator / N95** when cutting, grinding, or working in dust.

---

## 2. Pre-job safety check (required, every job)

Before any tools come out of the truck:

1. **PPE check.** Confirm every crew member has the required PPE on. Record `ppe_checked = true` on the job's safety record.
2. **Site walkthrough.** Identify hazards specific to this job: heights, electrical, soft ground, traffic, animals, hot weather, customer presence, scaffolding, etc.
3. **Note OSHA-relevant conditions.** If any condition is borderline (working surface, weather, electrical proximity), document it in the safety notes BEFORE starting.
4. **Sign off.** The crew lead (or solo contractor) signs off on the safety check by name + timestamp. This is recorded on the job's safety record.

If any hazard cannot be mitigated on-site:

- **Stop.**
- Call the lead.
- Document the hazard and the stop decision.
- The job moves to `on_hold` until the hazard is resolved.

---

## 3. Job-specific hazard checklist

The platform generates a job-specific hazard checklist when the job is dispatched. It's based on job type, site notes, weather, and historical incidents at similar jobs. Run through it before starting.

Examples by job type:

### Ramp install

- Working at height when assembling stair sections — fall risk
- Sharp aluminum / steel edges
- Pinch points on platform connections
- Soft ground / uneven terrain affecting footing
- Power tool operation (drills, drivers)

### VPL install

- Electrical connection — verify power is off; lockout / tagout if applicable
- Heavy lift component handling
- Pinch points on lift mechanism
- Floor / threshold modification dust

### Stair lift install

- Working on stairs — fall risk while installing
- Electrical connection
- Drilling into masonry / framing — dust + structural awareness

### Knockdown / return haul

- Loading heavy components onto truck
- Strain risk on disassembly
- Sharp edges on disassembled components
- Securing load for transport

### All jobs

- Heat / dehydration in Florida sun — hydrate before, during, after
- Sun exposure — long sleeves / sunscreen / hydration
- Wildlife (snakes, fire ants, wasps) on unfamiliar sites
- Customer / occupant presence — keep work area clear

---

## 4. Stop-work authority

**Any crew member can stop the job at any time if they identify a safety issue.**

Stop work means:

1. Tools down.
2. Step back from the hazard.
3. Call the lead.
4. Document the stop in the job notes (what hazard, what time, what was decided).

Stop-work decisions are never penalized. A stopped job is a successful safety outcome.

---

## 5. Incident reporting

If an incident occurs (injury, near-miss, property damage, customer complaint involving safety):

1. **Address immediate safety first.** Treat injuries; secure the hazard.
2. **Document in the job's safety record.** Time, what happened, who was involved, what was done.
3. **Photograph if safe to do so.** Damage, conditions, area.
4. **Notify the lead within 24 hours.** Use the lead's preferred channel (call, text, in-app once Phase 2 ships).
5. **Do not negotiate or admit fault to the customer.** Document and escalate.

Incidents are reviewed by Florida Ramp & Lift admin and may be used to update this SOP. They are NOT used to penalize the reporting contractor.

---

## 6. Human review gates (the safety side of the platform)

These platform-side gates exist to make sure safety isn't bypassed by automation:

- **Pre-job:** `ppe_checked` must be `true` AND `safety_signoff_by` + `safety_signoff_at` must be set before status moves out of `scheduled`.
- **Submission:** The job's safety record must be complete before the job can move to `submitted`.
- **Approval:** Admin reviewing a submitted job MUST verify the safety record is complete; admins cannot approve a job with an empty safety record.

These gates are enforced in the schema validation (`schemas/safety.schema.json`) and the SOP review during approval.

---

## 7. Hot weather + Florida sun

The Florida operating environment requires explicit hot-weather discipline:

- **Hydrate before the job starts.** Truck has water; drink it.
- **Take heat breaks.** Especially on roof / open-sun work, especially between 11 AM and 3 PM.
- **Watch for heat illness.** Symptoms: cramps, dizziness, nausea, confusion. If any crew member shows symptoms — stop, shade, water, escalate.
- **Reschedule if conditions are extreme.** Heat advisory + roof work + heavy lift = reschedule. Lead's call.

---

## 8. Tool safety

- Inspect tools before use. Damaged drill bit, frayed cord, missing guard → do not use.
- Cords are kept out of walkways.
- Battery tools: confirm battery is seated and charged. Spare battery in the truck.
- Cutting tools: clear cut area before triggering.
- Ladder use: 4:1 ratio, three points of contact, never the top two rungs.

---

## 9. Customer / occupant interaction during safety-sensitive work

- Keep the work area clear. Politely ask occupants to step back if they enter the zone.
- Do not let customers, kids, or pets near power tools, sharp edges, or fall-risk areas.
- If the site is occupied (residential, ALF, commercial), communicate before starting noisy / dust-generating work.
- If you cannot establish a safe perimeter, call the lead. Do not proceed.

---

## 10. End-of-job safety walk

Before the truck leaves:

- [ ] All tools accounted for and stowed
- [ ] Hardware accounted for; no loose screws / staples / blades left on site
- [ ] Work area clean (sweep, vacuum debris from inside surfaces)
- [ ] No trip hazards left for the customer
- [ ] Signed completion or photo of signed form captured
- [ ] Customer briefed on any safe-use considerations for the installed equipment (especially ramps and lifts)

---

## 11. Schema reference

The fields used by this SOP map to `schemas/safety.schema.json`. The platform stores the safety record per job. Required fields:

- `ppe_checked` (boolean — must be true)
- `ppe_items_verified[]` (array — must include steel_toed_boots, safety_glasses, gloves)
- `safety_signoff_by` (contractor ref — required)
- `safety_signoff_at` (datetime — required)
- `job_specific_hazards[]` (array of strings)
- `osha_notes` (string)

A safety record without these fields populated is a schema-validation failure and the job cannot be submitted.
