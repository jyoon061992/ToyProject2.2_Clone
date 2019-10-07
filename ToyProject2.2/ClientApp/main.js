import Vue from 'vue'
import '@progress/kendo-ui';
import { DataSource, HierarchicalDataSource, GanttDataSource, GanttDependencyDataSource, PivotDataSource, SchedulerDataSource, TreeListDataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper';
import { Grid, GridColumn, GridInstaller } from '@progress/kendo-grid-vue-wrapper';
import JSZip from 'jszip';

Vue.use(GridInstaller);
Vue.use(DataSourceInstaller);

new Vue({
    el: '#vueapp',
    data() {
        return {
            schemaModelFields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: 'number', validation: { required: true, min: 1 } },
                Discontinued: { type: 'boolean' },
                UnitsInStock: { type: 'number', validation: { min: 0, required: true } }
            },
            discontinuedDs: [
                { Discontinued: true },
                { Discontinued: false }
            ],
            aggregateDefinition: [
                { field: "UnitPrice", aggregate: "sum", },
                { field: "UnitsInStock", aggregate: "count" }]
        }
    },
    methods: {
        parameterMap: function (options, operation) {
            if (operation !== 'read' && options.models) {
                return { models: kendo.stringify(options.models) }
            }
        }
    }
});