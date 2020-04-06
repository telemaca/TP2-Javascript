describe("precioMaquina()", (componentes, precios) => {
    it("Debería devolver un número", () => {
        const precios = [
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 },
            { componente: "RAM Quinston", precio: 110 }
          ]
        const resultado = precioMaquina(["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"], precios);

        expect(resultado).to.be.finite;
    }) 

    it("Debería sumar el precio de los componentes ingresados en el array-parámetro y devolver el total", () => {
        const precios = [
            { componente: "Monitor GPRS 3000", precio: 200 },
            { componente: "Motherboard ASUS 1500", precio: 120 },
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 }
        ]
        const resultado = precioMaquina(["Monitor ASC 543", "Motherboard ASUS 1200"], precios);
        const resultado2 = precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1200"], precios);
        const resultado3 = precioMaquina(["Monitor ASC 543", "Motherboard ASUS 1500"], precios);

        expect(resultado).to.eql(350)
        expect(resultado2).to.eql(300)
        expect(resultado3).to.eql(370)
    })

    it("Debería devolver 0 si se le pasa un array vacío como parámetro", () => {
        const precios = [
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 },
            { componente: "RAM Quinston", precio: 110 }
        ]
        const resultado = precioMaquina([], precios);

        expect(resultado).to.eql(0)
    })

    it("Debería devolver 0 si los componentes ingresados no se corresponden a componentes de la lista de precios", () => {
        const precios = [
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 },
            { componente: "RAM Quinston", precio: 110 }
        ]
        const resultado = precioMaquina(["abababa"], precios);

        expect(resultado).to.eql(0)
    })

    it("El objeto 'precios' debe ser igual antes y después", () => {
        const precios = [
            { componente: "Monitor GPRS 3000", precio: 200 },
            { componente: "Motherboard ASUS 1500", precio: 120 },
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 }
        ]
        const copiaPrecios = deepcopy(precios)
        precioMaquina(["Monitor ASC 543", "Motherboard ASUS 1200"], precios)
        expect(precios).to.deep.eql(copiaPrecios);
    })
})

describe("cantidadVentasComponente()", (componenteElegido, ventas) => {
    it("Debería devolver un número", () => {
        const ventas = [
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor ASC 543", "Motherboard MZI"] }
        ]
        const resultado = cantidadVentasComponente("Monitor ASC 543", ventas);

        expect(resultado).to.be.finite;
    })

    it("Debería mostrar la cantidad de veces que se vendió un componente", () => {
        const ventas = [
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor ASC 543", "Motherboard MZI"] }
        ]
        const resultado = cantidadVentasComponente("Monitor ASC 543", ventas);
        const resultado2 = cantidadVentasComponente("Monitor GPRS 3000", ventas);
        const resultado3 = cantidadVentasComponente("Motherboard MZI", ventas);

        expect(resultado).to.eql(1)
        expect(resultado2).to.eql(2)
        expect(resultado3).to.eql(3)
    })

    it("Debería devolver 0 si el componente ingresado no forma parte de la lista de precios o el nombre está mal escrito", () => {
        const ventas = [
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor ASC 543", "Motherboard MZI"] }
        ]
        const resultado = cantidadVentasComponente("RAM Quinston", ventas);
        const resultado2 = cantidadVentasComponente("Monitor GPR 3000", ventas);

        expect(resultado).to.eql(0)
        expect(resultado2).to.eql(0)
    })

    it("El objeto 'ventas' debe ser igual antes y después", () => {
        const ventas = [
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
            { componentes: ["Monitor ASC 543", "Motherboard MZI"] }
        ]
        const copiaVentas = deepcopy(ventas)
        cantidadVentasComponente("Monitor GPRS 3000", ventas)
        expect(ventas).to.deep.eql(copiaVentas);
    })
})

describe("vendedoraDelMes()", (mes, anio, local) => {
    it("Debería devolver un string", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const resultado = vendedoraDelMes(2, 2019, local)
        expect(resultado).to.be.a("string");
    })

    it("Debería sumar las ventas de las vendedoras del mes y año ingresados y devolver la que más vendió", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        
        const resultado = vendedoraDelMes(2, 2019, local)
        const resultado2 = vendedoraDelMes(1, 2019, local)

        expect(resultado).to.eql("Ada")
        expect(resultado2).to.eql("Grace")
    })

    it("Debería tirar error si el mes ingresado no corresponde a un mes con ventas", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}

        const fn = () => {
            vendedoraDelMes(3, 2019, local)
        }
        expect(fn).to.throw("Los parámetros mes o año no son válidos")
    })

    it("Debería tirar error si el año ingresado no corresponde a un año con ventas", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}

        const fn = () => {
            vendedoraDelMes(1, 2017, local)
        }
        expect(fn).to.throw("Los parámetros mes o año no son válidos")
    })
    
    it("Debería tirar error si el tercer parámetro (local) no es ingresado", () => {
        const fn = () => {
            vendedoraDelMes(1, 2017)
        }
        expect(fn).to.throw("El tercer parámetro no fue ingresado")
    })
    
    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        vendedoraDelMes(1, 2019, local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("ventasMes()", (mes, anio, local) => {
    it("Debería devolver un número", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const resultado = ventasMes(1, 2019, local);

        expect(resultado).to.be.finite;
    })

    it("Debería sumar el precio de todos los componentes vendidos en el mes y año ingresados", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const resultado = ventasMes(1, 2019, local);

        expect(resultado).to.eql(950)
    })

    it("Debería devolver 0 si en el mes ingresado no hubo ventas", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        
        const resultado = ventasMes(5, 2019, local)

        expect(resultado).to.eql(0)
    })

    it("Debería devolver 0 si en el año ingresado no hubo ventas", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}

            const resultado = ventasMes(1, 2017, local)

            expect(resultado).to.eql(0)
    })

    it("Debería tirar error si el tercer parámetro (local) no es ingresado", () => {
        const fn = () => {
            ventasMes(1, 2017)
        }
        expect(fn).to.throw("El tercer parámetro no fue ingresado")
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            vendedoras: ["Ada", "Grace"],
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}

        const copiaLocal = deepcopy(local);
        ventasMes(1, 2019, local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("huboVentas()", (mes, anio, ventas) => {
    it("Debería devolver true si en el mes y año ingresados hubo ventas", () => {
        const ventas = [
            { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
            { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ]
        const resultado = huboVentas(1, 2019, ventas)
        expect(resultado).to.be.true
    })

    it("Debería devolver false si en el mes y año ingresados no hubo ventas", () => {
        const ventas = [
            { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
            { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ]
        const resultado = huboVentas(3, 2019, ventas)
        expect(resultado).to.be.false
    })

    it("Debería tirar error si el tercer parámetro (local) no es ingresado", () => {
        const fn = () => {
            huboVentas(1, 2017)
        }
        expect(fn).to.throw("El tercer parámetro no fue ingresado")
    })

    it("'Ventas' debe ser igual antes y después", () => {
        const ventas = [
            { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
            { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
            { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
        ]

        const copiaVentas = deepcopy(ventas);
        huboVentas(1, 2019, ventas);
        
        expect(ventas).to.deep.eql(copiaVentas);
    })
})

describe("componenteMasVendido()", (local) => {
    it("Debería devolver un string", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const resultado = componenteMasVendido(local)
        expect(resultado).to.be.a("string");
    })

    it("Debería devolver el componente más vendido históricamente", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const resultado = componenteMasVendido(local)
        expect(resultado).to.eql("Monitor GPRS 3000");
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), componentes: ["Monitor GPRS 3000", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        componenteMasVendido(local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("ventasVendedora()", (nombre, local) => {
    it("Debería devolver un número", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const result = ventasVendedora("Grace", local)
        expect(result).to.be.finite
    })
    it("Debería devolver el total de dinero que generó históricamente la vendedora ingresada", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const result = ventasVendedora("Grace", local)
        expect(result).to.be.eql(600)
    })
    it("Debería devolver 0 si se escribe mal el nombre de la vendedora o se ingresa una vendedora que no existe", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const result = ventasVendedora("Aaa", local)
        expect(result).to.be.eql(0)
    })
    it("Debería tirar error si el segundo parámetro (local) no es ingresado", () => {
        const fn = () => {
            ventasVendedora("Grace")
        }
        expect(fn).to.throw("El segundo parámetro no fue ingresado")
    })
    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        ventasVendedora("Ada", local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("ventasSucursal()", (sucursal, local) => {
    it("Debería devolver un número", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]}
        const result = ventasSucursal("Centro", local)
        expect(result).to.be.finite
    })
    it("Debería devolver el total de dinero que se vendió históricamente en la sucursal ingresada", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const result = ventasSucursal("Centro", local)
        expect(result).to.be.eql(920)
    })
    it("Debería devolver 0 si se escribe mal el nombre de la vendedora o se ingresa una vendedora que no existe", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const result = ventasSucursal("Aaa", local)
        expect(result).to.be.eql(0)
    })
    it("Debería tirar error si el segundo parámetro (local) no es ingresado", () => {
        const fn = () => {
            ventasSucursal("Centro")
        }
        expect(fn).to.throw("El segundo parámetro no fue ingresado")
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        ventasSucursal("Centro", local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("sucursalDelMes()", (mes, anio, local) => {
    it("Debería devolver un string", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }
        const resultado = sucursalDelMes(2, 2019, local)
        expect(resultado).to.be.a("string");
    })

    it("Debería sumar las ventas de las sucursales del mes y año ingresados y devolver la que más vendió", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }
        const resultado = sucursalDelMes(2, 2019, local)
        expect(resultado).to.eql("Centro")
    })

    it("Debería tirar error si el mes ingresado no corresponde a un mes con ventas", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const fn = () => {
            sucursalDelMes(3, 2019, local)
        }
        expect(fn).to.throw("Los parámetros mes o año no son válidos")
    })

    it("Debería tirar error si el año ingresado no corresponde a un año con ventas", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const fn = () => {
            sucursalDelMes(1, 2017, local)
        }
        expect(fn).to.throw("Los parámetros mes o año no son válidos")
    })
    
    it("Debería tirar error si el tercer parámetro (local) no es ingresado", () => {
        const fn = () => {
            sucursalDelMes(1, 2017)
        }
        expect(fn).to.throw("El tercer parámetro no fue ingresado")
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 1, 4), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 1), sucursal: "Centro", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 0, 2), sucursal: "Centro", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
                { fecha: new Date(2019, 0, 10), sucursal: "Caballito", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        sucursalDelMes(1, 2019, local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("renderPorMes()", (local) => {
    it("Debería devolver un string", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }
        
        const resultado = renderPorMes(local)
        expect(resultado).to.be.a("string");
    })

    it("Debería devolver una lista con los ventas totales de cada mes/año en que hubo ventas", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }
        
        const resultado = renderPorMes(local)
        expect(resultado).to.equal("Total de enero de 2019: $370\nTotal de febrero de 2019: $320\n");
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"] },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }

        const copiaLocal = deepcopy(local);
        renderPorMes(local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("renderPorSucursal()", (local) => {
    it("Debería devolver un string", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"], sucursal: "Caballito" },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }
        
        const resultado = renderPorSucursal(local)
        expect(resultado).to.be.a("string");
    })

    it("Debería devolver una lista con los ventas totales de cada sucursal", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"], sucursal: "Caballito" },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }
        
        const resultado = renderPorSucursal(local)
        expect(resultado).to.equal("Ventas por sucursal:\n-Total de Centro: $320\n-Total de Caballito: $370\n");
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = { 
            sucursales: ['Centro', 'Caballito'],
            ventas: [
                { fecha: new Date(2019, 0, 4), componentes: ["Monitor ASC 543", "Motherboard ASUS 1500"], sucursal: "Caballito" },
                { fecha: new Date(2019, 1, 1), componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Monitor ASC 543", precio: 250 }
            ]
        }

        const copiaLocal = deepcopy(local);
        renderPorSucursal(local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})

describe("render()", local => {
    it("Debería devolver un string", () => {
        const local = {
            vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
            sucursales: ['Centro', 'Caballito'],
            ventas: [
              { fecha: new Date(2018, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard MZI"], sucursal: "Caballito" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }
        const resultado = render(local)
        expect(resultado).to.be.a("string");
    })

    it("Debería devolver una lista con las ventas por mes, las ventas de cada sucursal, el producto más venido y la vendedora con más ventas", () => {
        const local = {
            vendedoras: ["Ada", "Grace"],
            sucursales: ['Centro', 'Caballito'],
            ventas: [
              { fecha: new Date(2018, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard MZI"], sucursal: "Caballito" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }
        const resultado = render(local)
        expect(resultado).to.equal("Reporte\n==========================================\nTotal de febrero de 2018: $320\nTotal de enero de 2019: $530\n------------------------------------------\nVentas por sucursal:\n-Total de Centro: $620\n-Total de Caballito: $230\n------------------------------------------\nProducto estrella: Monitor GPRS 3000\n------------------------------------------\nVendedora que más ingresos generó: Grace");
    })

    it("El objeto 'local' debe ser igual antes y después", () => {
        const local = {
            vendedoras: ["Ada", "Grace"],
            sucursales: ['Centro', 'Caballito'],
            ventas: [
              { fecha: new Date(2018, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
              { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard MZI"], sucursal: "Caballito" }
            ],
            precios: [
                { componente: "Monitor GPRS 3000", precio: 200 },
                { componente: "Motherboard ASUS 1500", precio: 120 },
                { componente: "Motherboard ASUS 1200", precio: 100 },
                { componente: "Motherboard MZI", precio: 30 }
            ]
        }

        const copiaLocal = deepcopy(local);
        render(local);
        
        expect(local).to.deep.eql(copiaLocal);
    })
})