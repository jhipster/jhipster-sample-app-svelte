package tech.jhipster.sample;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

	@Test
	void servicesAndRepositoriesShouldNotDependOnWebLayer() {
		JavaClasses importedClasses = new ClassFileImporter()
			.withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
			.importPackages("tech.jhipster.sample");

		noClasses()
			.that()
			.resideInAnyPackage("tech.jhipster.sample.service..")
			.or()
			.resideInAnyPackage("tech.jhipster.sample.repository..")
			.should()
			.dependOnClassesThat()
			.resideInAnyPackage("..tech.jhipster.sample.web..")
			.because("Services and repositories should not depend on web layer")
			.check(importedClasses);
	}
}
