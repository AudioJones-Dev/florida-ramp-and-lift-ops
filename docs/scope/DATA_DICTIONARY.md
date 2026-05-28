# DATA DICTIONARY

This dictionary defines initial extraction targets and canonical mappings.

| Source concept | Canonical field | Type | Notes |
|---|---|---|---|
| Work Order Number | `work_order.number` | string | Primary external identifier |
| SAP Order Number | `work_order.sap_order_number` | string | Billing/ERP linkage |
| Product Unit Number | `asset.product_unit_number` | string | Modular asset traceability |
| Client Name | `client.name` | string | Contracting entity |
| Site Address | `site.address.full` | string | Dispatch destination |
| Site Contact Name | `site.contact.name` | string | Field coordination |
| Site Contact Phone | `site.contact.phone` | string | Dispatch communication |
| Line Items | `scope.line_items[]` | array | Structured items from service report |
| Quantity | `scope.line_items[].quantity` | number | Supports partial and full units |
| Dispatch Requirements | `scope.dispatch_requirements[]` | array | Crew/logistics requirements |
| Safety Requirements | `safety.requirements[]` | array | Site/PPE constraints |
| PPE Required | `safety.ppe_required[]` | array | Baseline + job-specific PPE |
| Billing Reference | `billing.reference` | string | Invoice and reconciliation link |
| Completion Status | `completion.status` | string | `pending`, `in_progress`, `completed`, `signed_off` |
| Signature Present | `completion.signature_present` | boolean | Indicates signed completion artifact |

## Auditability rule

Where possible, extracted values should include source references (page/line/snippet metadata) in parser output artifacts.
