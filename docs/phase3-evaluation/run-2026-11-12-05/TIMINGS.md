# Live request timing evidence

One fresh set; no statistical latency guarantee. End-to-end limit remains 50,000 ms. All outputs are Draft, not human-approved. Connection and Discovery reused only the fresh set’s jointly compared concept plan; every storyboard was independently written. No previous storyboard was reused.
| Channel | Total ms | Critique | Final result |
| --- | ---: | --- | --- |
| Trust | 13979 | attempted; one call | Validated advisory rewrite returned |
| Connection | 7977 | attempted; one call | Validated initial Draft retained |
| Discovery | 11239 | attempted; one call | Validated advisory rewrite returned |

## Trust

| Stage | Outcome | Duration ms | Remaining ms |
| --- | --- | ---: | ---: |
| concept | complete | 5645 | 44331 |
| story | complete | 3486 | 40838 |
| validation | passed | 4 | 40834 |
| advisory | attempted | 0 | 40833 |
| critique | complete | 1591 | 39242 |
| advisory_rewrite | complete | 3215 | 36026 |
| validation | passed | 1 | 36025 |

[Full stage trace](trust-stages.json).

## Connection

| Stage | Outcome | Duration ms | Remaining ms |
| --- | --- | ---: | ---: |
| story | complete | 3653 | 46346 |
| validation | passed | 0 | 46346 |
| advisory | attempted | 0 | 46345 |
| critique | complete | 1476 | 44869 |
| advisory_rewrite | complete | 2844 | 42025 |
| validation | Delivery (Scene pacing) | 1 | 42024 |
| advisory | retained_valid_draft | 0 | 42024 |

Warnings returned with the actual draft:

- The optional advisory rewrite failed output checks. The validated initial Draft was retained; human editorial review is required.

[Full stage trace](connection-stages.json).

## Discovery

| Stage | Outcome | Duration ms | Remaining ms |
| --- | --- | ---: | ---: |
| story | complete | 3704 | 46296 |
| validation | Concept delivery | 1 | 46295 |
| repair | complete | 3019 | 43276 |
| validation | passed | 2 | 43274 |
| advisory | attempted | 0 | 43274 |
| critique | complete | 1340 | 41934 |
| advisory_rewrite | complete | 3170 | 38763 |
| validation | passed | 1 | 38762 |

[Full stage trace](discovery-stages.json).
