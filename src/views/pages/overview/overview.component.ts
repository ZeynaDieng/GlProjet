import { transition } from '@angular/animations';
import { StatisticService } from './../../../services/statistic.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import {
  clearLocalStorage,
  getLocalData,
} from '../../../utils/local-storage-service';
import { OrganisationCategory, UserRoles } from '../../../utils/enums';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  
} from 'ng-apexcharts';

export type ChartOptionsType = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: {
    type: string;
    gradient?: {
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      stops: number[];
      colorStops?: {
        offset: number;
        color: string;
        opacity: number;
      }[];
    };
    solid?: {
      color: string;
    };
    // colors: string[];
    colors: string[];
  };
   colors: string[];
  tooltip: ApexTooltip;
  // chart: ApexChart;
  // title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  // subtitle: ApexTitleSubtitle;
};
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';   
import { OffLineComponent } from "../../components/off-line/off-line.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    // FilteredAppointmentTableComponent,
    NgxSkeletonLoaderModule,
    NgApexchartsModule,
    OffLineComponent
],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent implements OnInit {
  status = '';
  isLoadingData: boolean = true;
  statList:  Array<any> = [];
  statListFacture: Array<any> = [];
  transactions: any[] = [];

  series!: ApexNonAxisChartSeries;
  chartOptionsGains!: ChartOptionsType;
  chartOptionsTransactions!: ChartOptionsType;
  chartOptionsFonds!: ChartOptionsType;
  chartOptionsCA!: ChartOptionsType;
  
  chart: ApexChart = {
    type: 'area',
    height: 100,
    width: 100,
    sparkline: {
      enabled: true,
    },
  };
  

  labels = ['Rendez-vous honorés'];



  constructor(private router: Router, private statistic: StatisticService) {}

  ngOnInit(): void {
    this.isLoadingData = true;
   // Configuration pour la carte "Gains Total" (couleur rouge #EA5455)
   this.chartOptionsGains = {
    series: [
      {
        name: 'Gains',
        data: [10, 20, 15, 30, 25],
      },
    ],
    colors: ['#EA5455'],
    chart: {
      type: 'area',
      height: 100,
      sparkline: { enabled: true },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: 'smooth',
      width: 2,
      colors: ['#EA5455']
    },
    fill: {
      type: 'gradient',
      colors: ['#EA5455'],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#EA5455',
            opacity: 0.7
          },
          {
            offset: 100,
            color: '#EA5455',
            opacity: 0.3
          }
        ]
      }
    },
    labels: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
    xaxis: { 
      type: 'datetime',
      labels: { show: false }
    },
    yaxis: { 
      opposite: true,
      show: false
    },
    tooltip: {
      enabled: false
    },
    legend: { show: false }
  };
  

// Configuration pour la carte "Transactions partenaires" (couleur violette #7367F0)
this.chartOptionsTransactions = {
  series: [
    {
      name: 'Transactions',
      data: [15, 25, 20, 35, 30],
    },
  ],
  colors: ['#7367F0'], // Violet correspondant à l'icône
  chart: {
    type: 'area',
    height: 100,
    sparkline: { enabled: true },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { 
    curve: 'smooth',
    width: 2,
    colors: ['#7367F0']
  },
  fill: {
    type: 'gradient',
    colors: ['#7367F0'],
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#7367F0',
          opacity: 0.7
        },
        {
          offset: 100,
          color: '#7367F0',
          opacity: 0.3
        }
      ]
    }
  },
  labels: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
  xaxis: { 
    type: 'datetime',
    labels: { show: false }
  },
  yaxis: { 
    opposite: true,
    show: false
  },
  tooltip: {
    enabled: false
  },
  legend: { show: false }
};

// Configuration pour la carte "Appel de fonds" (couleur orange #FF9F43)
this.chartOptionsFonds = {
  series: [
    {
      name: 'Fonds',
      data: [5, 15, 10, 20, 15],
    },
  ],
  colors: ['#FF9F43'], // Orange correspondant à l'icône
  chart: {
    type: 'area',
    height: 100,
    sparkline: { enabled: true },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { 
    curve: 'smooth',
    width: 2,
    colors: ['#FF9F43']
  },
  fill: {
    type: 'gradient',
    colors: ['#FF9F43'],
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#FF9F43',
          opacity: 0.7
        },
        {
          offset: 100,
          color: '#FF9F43',
          opacity: 0.3
        }
      ]
    }
  },
  labels: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
  xaxis: { 
    type: 'datetime',
    labels: { show: false }
  },
  yaxis: { 
    opposite: true,
    show: false
  },
  tooltip: {
    enabled: false
  },
  legend: { show: false }
};

// Configuration pour la carte "Chiffre d'affaire total" (couleur verte #28C76F)
this.chartOptionsCA = {
  series: [
    {
      name: 'CA',
      data: [30, 40, 35, 50, 45],
    },
  ],
  colors: ['#28C76F'], // Couleur de la ligne
  chart: {
    type: 'area',
    height: 100,
    sparkline: { enabled: true },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { 
    curve: 'smooth',
    width: 2,
    colors: ['#28C76F']
  },
  fill: {
    type: 'gradient',
    colors: ['#28C76F'],
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#28C76F',
          opacity: 0.7
        },
        {
          offset: 100,
          color: '#28C76F',
          opacity: 0.3
        }
      ]
    }
  },
  labels: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
  xaxis: { 
    type: 'datetime',
    labels: { show: false }
  },
  yaxis: { 
    opposite: true,
    show: false
  },
  tooltip: {
    enabled: false
  },
  legend: { show: false }
};

    this.getOrganisationFactureStatistic();
    this.getOrganisationStatistic();
    console.log('Component initialisé !');
    this.getFilteredRdvs;
  }
isOrganisationProvider(): boolean {
    const category = getLocalData('organisationCategory');
    return category == OrganisationCategory.provider;
  }
  
  getOrganisationStatistic(): void {
    this.statistic.getOrganisationStatistic().subscribe({
      next: (response: any) => {
        console.log('Réponse reçue :', response);
        this.statList = [response.data];
        this.transactions = this.statList[0].transactions;
        console.log('STAT LIST', this.statList);

        
        this.series = [
          isNaN(this.statList[0].percentageValidateRdvs)
            ? 0
            : this.statList[0].percentageValidateRdvs,
        ];

        this.isLoadingData = false;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des statistiques :',
          error
        );
        this.isLoadingData = false;
      },
    });
  }


  getOrganisationFactureStatistic(): void {
    this.statistic.getOrganisationFactureStatistic().subscribe({
      next: (response: any) => {
        console.log('Réponse reçue Facture :', response);
        this.statListFacture = response.data;
        // this.transactions = this.statList[0].transactions;
        console.log('STAT LIST Facture', this.statListFacture);

        // this.series = [
        //   isNaN(this.statList[0].percentageValidateRdvs)
        //     ? 0
        //     : this.statList[0].percentageValidateRdvs,
        // ];

        this.isLoadingData = false;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des statistiques :',
          error
        );
        this.isLoadingData = false;
      },
    });
  }


  getFilteredRdvs(status: string): any[] {
    if (this.statList.length > 0 && this.statList[0].allRdvs) {
      return this.statList[0].allRdvs.filter(
        (rdv: any) => rdv.status === status
      );
    }
    console.log(this.statList[0].allRdvs);

    return [];
  }

  getTransactionRdvs(status: string): any[] {
    if (this.statList.length > 0 && this.statList[0].transactions) {
      return this.statList[0].allRdvs.filter(
        (rdv: any) => rdv.status === status
      );
    }
    console.log(this.statList[0].allRdvs);

    return [];
  }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }

  goToDetails(route: string, id: string) {
    this.router.navigate([route, id]);
  }
}
