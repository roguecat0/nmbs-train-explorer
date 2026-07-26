# Train repair game — privacy note

Status: planning only. No implementation changes have been made from this note.

- The per-visitor identifier and completion reporting are analytics tracking;
  cookies and local storage are both covered by Belgian cookie rules for this
  purpose.
- Before creating/reading the analytics identifier or sending completion events,
  obtain optional, explicit consent.
- Refusing analytics must not block the game: local progress continues, but that
  visitor is excluded from the live reporting.
- Include an equally prominent reject option and a way to withdraw consent.
- Provide an event-specific cookie/privacy notice describing the data, purpose,
  retention, controller, and withdrawal mechanism.

Source checked during planning: Belgian Data Protection Authority cookie guidance
(https://www.dataprotectionauthority.be/professioneel/thema-s/cookies).
