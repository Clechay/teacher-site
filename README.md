# teacher-site

## static site generator made for teachers and academic personnel

unfortunately content editing is still a manual process

you can reverse engineer example project while documentation is beeing written

## How to use as CLI

1. Install teacher-site globally from npm.
2. To create new project (new site) use `tsite init` in an empty directory.
3. Then use `tsite build` to build your static website.

## How to use as API

1. Require `{load, save, build}` from teacher-site module
2. Use those accordingly to JSDoc.

## TODO

#### big issues
* Web UI
* introduce other entities:
    * resources for students
    * exercises
    * homeworks

#### small issues

* `add <group|class|location|subject>` command
* `remove <group|class|location|subject>` command
* `ls <group|class|location|subject>` command
* `watch` command
* `edit <group|class|location|subject>` command
* `load-template` command
* interactive `init`
* interactive `add`
* interactive `edit`
* add more templates
* maybe init should create loaded project and save it