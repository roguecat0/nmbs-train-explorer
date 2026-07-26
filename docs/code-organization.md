# Code organization

Use these boundaries when adding code to the train repair game.

1. URL entry points belong in `src/routes/`.
2. Repair-task content, including copy and visual metadata, belongs in `src/data/`.
3. Reusable visual building blocks belong in `src/components/`.
4. Client-side state shared by more than one route belongs in `src/context/`.
5. Framework-neutral helpers belong in `src/lib/`.

Keep the project deliberately small while the site has one product area. If a
second independent area is introduced, move its specific routes, components,
state, and data into `src/features/<area>/`; do not create a feature folder only
to wrap a single file.
