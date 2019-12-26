# teacher-site

## static site generator made for teachers and academic personnel

unfortunately content editing is still a manual process

you can reverse engineer example project while documentation is beeing written

## How to use as CLI

1. Install teacher-site globally from npm.
2. To create new project (new site) use `tsite init` in an empty directory.
3. Then use `tsite build` to build your static website.
4. Some content management can already be done with CLI
    * `tsite add group` adds group to project
    * `tsite add class` adds class to project
    * `tsite add subject` adds subject to project
    * `tsite remove class [-g group-slug]` remove class from group

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

* `remove <group|location|subject>` command
* `ls <group|class|location|subject>` command
* `watch` command
* `edit <group|class|location|subject>` command
* `load-template` command
* interactive `init`
* interactive `edit`
* add more templates
* maybe init should create loaded project and save it
* class slug should be autogen as it's generated in save>buildClasses
