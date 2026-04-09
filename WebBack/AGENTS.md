## Dev environment tips
- Use `./gradlew :WebBack:assemble` in parent folder to build the debug jar.
- Use `./gradlew :WebBack:build` in parent folder to all checks and builds.
- Run tests `./gradlew :WebBack:test`.
- Run `./gradlew :WebBack:run`.


## Project Structure
- Source code is in `src/main/java`.
- Test code is in `src/test/java`.
- Build configuration is in `build.gradle`.
- Use `./gradlew tasks` in parent folder to list all available tasks.


## Constraints
- Do not modify `gradle-wrapper.properties` in parent folder.
- Never commit `local.properties` in parent folder.
