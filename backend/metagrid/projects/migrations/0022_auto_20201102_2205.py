# Generated by Django 3.1.1 on 2020-11-02 22:05
from typing import TYPE_CHECKING

from django.db import migrations

if TYPE_CHECKING:
    from metagrid.projects.models import Facet, ProjectFacet


def update_facet_id(apps, schema_editor):
    FacetModel = apps.get_model("projects", "Facet")  # type: Facet
    ProjectFacetModel = apps.get_model(
        "projects", "ProjectFacet"
    )  # type: ProjectFacet

    project_facets = ProjectFacetModel.objects.all()

    for project_facet in project_facets:
        facet = FacetModel.objects.get(name=project_facet.name)
        project_facet.facet = facet

    ProjectFacetModel.objects.bulk_update(project_facets, ["facet"])


def reverse_update_facet_id(apps, schema_editor):
    ProjectFacetModel = apps.get_model(
        "projects", "ProjectFacet"
    )  # type: ProjectFacet

    ProjectFacetModel.objects.all().update(facet=None)


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0021_auto_20201102_2200"),
    ]

    operations = [
        migrations.RunPython(update_facet_id, reverse_update_facet_id)
    ]
