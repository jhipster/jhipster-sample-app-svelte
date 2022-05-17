# SvelteDemoApplication

This application was generated using `Svelte Hipster` v`0.9.0` and `JHipster` v`7.8.1`, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v7.8.1](https://www.jhipster.tech/documentation-archive/v7.8.1).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Vite](https://vitejs.dev/) as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all the scripts available to run for this project.

### Managing dependencies

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an _external dependency_. We recommend you to install the package to `devDependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install --save --save-exact -D @sveltejs/svelte-virtual-list
```

For further instructions on how to develop with JHipster and SvelteKit, have a look at [Using JHipster in development][] and [kit.svelte.dev](https://kit.svelte.dev/).

## Building for production

### Packaging as jar

To build the final jar and optimize the SvelteDemoApplication application for production, run:

    ./mvnw -Pprod clean verify

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.jar

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

    ./mvnw -Pprod,war clean verify

## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located alongside components and can be run with:

```
npm test
```

UI end-to-end tests are powered by [Cypress][]. They're located under cypress directory and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`npm run e2e`) in a second one.

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Note: we have turned off authentication in [src/main/docker/sonar.yml](src/main/docker/sonar.yml) for out of the box experience while trying out SonarQube, for real use cases turn it back on.

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.
Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

or
For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:
docker-compose -f src/main/docker/mysql.yml up -d
To stop it and remove the container, run:
docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:
./mvnw -Pprod verify jib:dockerBuild
Then run:
docker-compose -f src/main/docker/app.yml up -d
For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 7.8.1 archive]: https://www.jhipster.tech/documentation-archive/v7.8.1
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v7.8.1/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v7.8.1/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v7.8.1/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v7.8.1/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v7.8.1/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v7.8.1/setting-up-ci/
[node.js]: https://nodejs.org/
[jest]: https://facebook.github.io/jest/
[cypress]: https://www.cypress.io/
