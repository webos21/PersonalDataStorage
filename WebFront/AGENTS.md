## Notes
- Development builds can be done using `npm run build`, but final builds should be done using Gradle.


## Dev environment tips
- Use `npm run build` in parent folder to build the distribution package.
- Run tests `npm test`.
- Run `npm run dev`.


## Project Structure
- Source code is in `src`.
- Build configuration is in `build.gradle`.
- Use `./gradlew tasks` in parent folder to list all available tasks.


## Constraints
- Do not modify `gradle-wrapper.properties` in parent folder.
- Never commit `local.properties` in parent folder.
