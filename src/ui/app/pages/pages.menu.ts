export const PAGES_MENU = [
        {
            path: "pages",
            children: [
                // Dashboard
                {
                    path: "dashboard",
                    data: {
                        menu: {
                            title: "Dashboard",
                            icon: "ion-android-home",
                            selected: false,
                            expanded: false,
                            order: 0
                        }
                    }
                },
                // Data Import
                {
                    path: "dataimport",
                    data: {
                        menu: {
                            title: "Data Import",
                            icon: "ion-log-in",
                            selected: false,
                            expanded: false,
                            order: 120,
                        }
                    },
                    children: [
                        {
                            path: "accountimport",
                            data: {
                                menu: {
                                    title: "Account Import",
                                }
                            }
                        },
                        {
                            path: "indusrtyimport",
                            data: {
                                menu: {
                                    title: "Industry Import",
                                }
                            }
                        },
                        {
                            path: "stocksimport",
                            data: {
                                menu: {
                                    title: "Stocks Import",
                                }
                            }
                        }
                    ]
                },
                // Rebalancer
                /* Commented out as rebalancer component is currently incomplete
                * */
/*                {
                    path: "rebalancer",
                    data: {
                        menu: {
                            title: "Account View",
                            icon: "ion-shuffle",
                            selected: false,
                            expanded: false,
                            order: 110,
                        }
                    },
                    children: [
                        {
                            path: "accountview",
                            data: {
                                menu: {
                                    title: "Account View",
                                    icon: "ion-ios-upload"
                                }
                            }
                        },
                        {
                            path: "rebalance",
                            data: {
                                menu: {
                                    title: "Rebalance"
                                }
                            }
                        },
                        {
                            path: "rebalancerupload",
                            data: {
                                menu: {
                                    title: "Positions Upload",
                                    icon: "ion-ios-upload"
                                }
                            }
                        },
                        {
                            path: "rebalancergrid",
                            data: {
                                menu: {
                                    title: "Rebalance Table",
                                    icon: "ion-grid"
                                }
                            }
                        }
                    ]
                },*/
                // Screener
                {
                    path: "screener",
                    data: {
                        menu: {
                            title: "Screener",
                            icon: "ion-funnel",
                            selected: false,
                            expanded: false,
                            order: 100,
                        }
                    },
                    children: [
                        {
                            path: "screenBuilder",
                            data: {
                                menu: {
                                    title: "Screen Builder",
                                    icon: "ion-hammer"
                                }
                            }
                        },
                        {
                            path: "savedScreens",
                            data: {
                                menu: {
                                    title: "Saved Screens",
                                    icon: "ion-star"
                                }
                            }
                        },
                        {
                            path: "resultGrid",
                            data: {
                                menu: {
                                    title: "resultGrid",
                                    icon: "ion-grid"
                                }
                            }
                        }
                    ]

                },
                // Configuration
                {
                    path: "configuration",
                    data: {
                        menu: {
                            title: "Settings",
                            icon: "ion-gear-a",
                            selected: false,
                            expanded: false,
                            order: 190,
                        }
                    },
                    children: [
                        {
                            path: "modelconfig",
                            data: {
                                menu: {
                                    title: "Portfolio Model",
                                    icon: "ion-levels"
                                }
                            }
                        },
                        {
                            path: "thresholdvalues",
                            data: {
                                menu: {
                                    title: "Color Threshold Values",
                                    icon: "ion-speedometer"
                                }
                            }
                        },
                        {
                            path: "logging",
                            data: {
                                menu: {
                                    title: "Export Logs",
                                    icon: "ion-code-download"
                                }
                            }
                        }
                    ]
                },
                // Charts (from base template)
                {
                    path: "charts",
                    data: {
                        menu: {
                            title: "Charts",
                            icon: "ion-stats-bars",
                            selected: false,
                            expanded: false,
                            order: 200,
                        }
                    },
                    children: [
                        {
                            path: "chartist-js",
                            data: {
                                menu: {
                                    title: "chartist_js",
                                }
                            }
                        }
                    ]
                },
                // Help
                {
                    path: "help",
                    data: {
                        menu: {
                            title: "Help",
                            icon: "ion-help",
                            selected: false,
                            expanded: false,
                            order: 190,
                        }
                    },
                    children: [
                        {
                            path: "screenerhelp",
                            data: {
                                menu: {
                                    title: "Screener Help",
                                }
                            }
                        },
                        {
                            path: "dataimporthelp",
                            data: {
                                menu: {
                                    title: "Data Import Help"
                                }
                            }
                        },
                        {
                            path: "configurationhelp",
                            data: {
                                menu: {
                                    title: "Configuration Help"
                                }
                            }
                        }
                    ]
                },
              /*  {
                    path: "",
                    data: {
                        menu: {
                            title: "general.menu.pages",
                            icon: "ion-document",
                            selected: false,
                            expanded: false,
                            order: 650,
                        }
                    }
                },*/
            ]
        }
    ]
;
