## Dev environment tips
- Use `./gradlew :app:assembleDebug` in parent folder to build the app.
- Use `./gradlew :app:build` in parent folder to all checks and builds.
- Run tests `./gradlew :app:testDebugUnitTest`.


## Project Structure
- Source code is in `src/main/java`.
- Build configuration is in `build.gradle`.
- Use `./gradlew tasks` in parent folder to list all available tasks.


## Constraints
- Do not modify `gradle-wrapper.properties` in parent folder.
- Never commit `local.properties` in parent folder.
