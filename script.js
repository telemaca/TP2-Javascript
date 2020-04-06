//---------------------------------------------------------------------------------------
//----------------------------precioMaquina(componentes, precios)------------------------
//---------------------------------------------------------------------------------------
const precioMaquina = (componentes, precios) => {
    const porComponentes = componente => componentes.includes(componente.componente)
    const aPrecioFinal = (precio, precioActual) => precio + precioActual.precio
    
    return precios
            .filter(porComponentes)
            .reduce(aPrecioFinal, 0)
}

//---------------------------------------------------------------------------------------
//----------------------------cantidadVentasComponente(componente, ventas)---------------
//---------------------------------------------------------------------------------------
const cantidadVentasComponente = (componenteElegido, ventas) => {
    const porComponenteVendido = venta => venta.componentes.includes(componenteElegido)
    return ventas
            .filter(porComponenteVendido)
            .length
}

//---------------------------------------------------------------------------------------
//----------------------------vendedoraDelMes(mes, anio, local)--------------------------
//---------------------------------------------------------------------------------------
const vendedoraDelMes = (mes, anio, local) => {
    if (local === undefined) {
        throw new Error("El tercer parámetro no fue ingresado")
    }

    const porFecha = venta => 
        venta.fecha.getMonth() === mes-1 &&
        venta.fecha.getFullYear() === anio
    const aVentasTotales = (acumulador, actual) => {
        acumulador[actual.nombreVendedora] === undefined ? 
        acumulador[actual.nombreVendedora] = precioMaquina(actual.componentes, local.precios) : 
        acumulador[actual.nombreVendedora] += precioMaquina(actual.componentes, local.precios)
        return acumulador
    } 

    const totalesVendedoras = local.ventas
                                .filter(porFecha)
                                .reduce(aVentasTotales, {})

    const aMejorVendedora = (masVentas, vendedora) =>
        totalesVendedoras[vendedora] > totalesVendedoras[masVentas] ? vendedora : masVentas

    if (Object.keys(totalesVendedoras).length === 0) {
        throw new Error("Los parámetros mes o año no son válidos")
    }  
    else {
        return local.vendedoras.reduce(aMejorVendedora)
    }

}


//---------------------------------------------------------------------------------------
//----------------------------ventasMes(mes, anio, local)--------------------------------
//---------------------------------------------------------------------------------------
const ventasMes = (mes, anio, local) => {

    if (local === undefined) {
        throw new Error("El tercer parámetro no fue ingresado")
    }

    const porFecha = venta => 
        venta.fecha.getMonth() === mes - 1 && 
        venta.fecha.getFullYear() === anio
    const aVentasParticulares = venta => precioMaquina(venta.componentes, local.precios)
    const aVentasTotales = (acumulador, actual) => acumulador + actual

    

    return local.ventas
                .filter(porFecha)
                .map(aVentasParticulares)
                .reduce(aVentasTotales, 0)
}

//---------------------------------------------------------------------------------------
//----------------------------huboVentas(mes, anio, ventas)------------------------------
//---------------------------------------------------------------------------------------
const huboVentas = (mes, anio, ventas) => {
    if (ventas === undefined) {
        throw new Error("El tercer parámetro no fue ingresado")
    }

    const porFecha = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio
    const resultado = ventas.filter(porFecha)
    return resultado.length !== 0
}

//---------------------------------------------------------------------------------------
//----------------------------componenteMasVendido(local)--------------------------------
//---------------------------------------------------------------------------------------
const componenteMasVendido = local => {

    const aComponentes = precio =>  ({ 
            nombre: precio.componente,
            cantidadVendidos: cantidadVentasComponente(precio.componente, local.ventas) 
        })


    const aMasVendido = (masVendido, componente) => 
         masVendido.cantidadVendidos < componente.cantidadVendidos ? componente : masVendido

    const masVendido = local.precios
                            .map(aComponentes)
                            .reduce(aMasVendido)

    return masVendido.nombre
                
}


// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const porVentasParticulares = venta => precioMaquina(venta.componentes, local.precios)
const aVentasTotales = (total, venta) => total + venta

//---------------------------------------------------------------------------------------
//----------------------------ventasVendedora(nombre, local)-----------------------------
//---------------------------------------------------------------------------------------
const ventasVendedora = (nombre, local) => {
    if (local === undefined) {
        throw new Error("El segundo parámetro no fue ingresado")
    }
    const porVendedora = venta => venta.nombreVendedora === nombre

    return local.ventas
                .filter(porVendedora)
                .map(porVentasParticulares)
                .reduce(aVentasTotales, 0)
}

//---------------------------------------------------------------------------------------
//----------------------------ventasSucursal(sucursal, local)----------------------------
//---------------------------------------------------------------------------------------
const ventasSucursal = (sucursal, local) => {
    if (local === undefined) {
        throw new Error("El segundo parámetro no fue ingresado")
    }
    const porSucursal = venta => venta.sucursal === sucursal

    return local.ventas
                .filter(porSucursal)
                .map(porVentasParticulares)
                .reduce(aVentasTotales, 0)
}

//---------------------------------------------------------------------------------------
//----------------------------sucursalDelMes(mes, anio, local)---------------------------
//---------------------------------------------------------------------------------------
const sucursalDelMes = (mes, anio, local) => {
    if (local === undefined) {
        throw new Error("El tercer parámetro no fue ingresado")
    }

    const porFecha = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio
    const aVentasTotales = (acumulador, actual) => {
        acumulador[actual.sucursal] === undefined ? 
        acumulador[actual.sucursal] = precioMaquina(actual.componentes, local.precios) : 
        acumulador[actual.sucursal] += precioMaquina(actual.componentes, local.precios)
        return acumulador
    }

    const totalesSucursales = local.ventas
                            .filter(porFecha)
                            .reduce(aVentasTotales, {})

    const aMejorSucursal = (masVentas, sucursal) =>
        totalesSucursales[sucursal] > totalesSucursales[masVentas] ? sucursal : masVentas

    

    if (Object.keys(totalesSucursales).length === 0) {
        throw new Error("Los parámetros mes o año no son válidos")
    }  
    else {
        return local.sucursales.reduce(aMejorSucursal)
    }
}

//---------------------------------------------------------------------------------------
//----------------------------renderPorMes(local)----------------------------------------
//---------------------------------------------------------------------------------------

//Esta es la primera versión que hice:
const renderPorMes2 = local => {
    // Genero array con los meses en que hubo ventas
    const aMeses = (meses, venta) => {
        const mes = venta.fecha.getMonth() + 1
        if (!meses.includes(mes)) {
            meses = [...meses, mes]
        }
        return meses
    }

    const mesesConVentas = local.ventas
                                .reduce(aMeses, [])
                                .sort((a, b) => a - b)
    
    //Genero array con los años en que hubo ventas
    const aAnios = (anios, venta) => {
        const anio = venta.fecha.getFullYear()
        if (!anios.includes(anio)) {
            anios = [...anios, anio]
        }
        return anios
    }

    const aniosConVentas = local.ventas
                                .reduce(aAnios, [])
                                

    //Chequeo en qué combinaciones de meses y años hubo ventas (obtengo un array 2D en el que cada array indica mes/año en que hubo ventas)
    let mesAnioVentas = []
    for (const anioConVentas of aniosConVentas) {
        for (const mesConVenta of mesesConVentas) {
            if (huboVentas(mesConVenta, anioConVentas, local.ventas)) {
                mesAnioVentas = [...mesAnioVentas, [mesConVenta, anioConVentas]]
            }
        }
    }    
    
    //array de meses que uso para convertir el número a su nombre
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    
    const aMensaje = mesAnioVenta => {
        //Uso la info del array 2D para calcular cuánto se vendió en determinado mes/año
        const resultado = ventasMes(mesAnioVenta[0], mesAnioVenta[1], local)
        //El mes lo calculo con el index 0 de cada array del array 2D y le resto 1 (porque en las otras funciones creadas, el parámetro siempre es el número real del mes, no el que se usa en Date; como acá necesito índices, le resto 1)
        const mes = meses[mesAnioVenta[0]-1]
        //El año lo calculo con el index 1 de cada array del array 2D
        const anio = mesAnioVenta[1]
        //Devuelvo un array con strings con la info pertinente
        return `Total de ${mes} de ${anio}: $${resultado}\n`
    }

    //Tranformo el array de strings a un mensaje
    const aString = (mensaje, string) => mensaje + string
    
    const mensaje = mesAnioVentas
                    .map(aMensaje)
                    .reduce(aString)
    
    return mensaje
}


const renderPorMes = local => {
    //Mapeo para obtener array con mes/año de ventas como strings
    const aMesesAniosConVentas = venta => `${venta.fecha.getMonth()},${venta.fecha.getFullYear()}`
    const mesesAnios = local.ventas.map(aMesesAniosConVentas)
    
    //Genero array con los meses/años en que hubo ventas, sin repetir
    let mesAnioVentas = []
    for (const mesAnio of mesesAnios) {
        if (!mesAnioVentas.includes(mesAnio)) {
            mesAnioVentas = [...mesAnioVentas, mesAnio]
        }
    }
    
    //Transformo array de strings a array 2D y paso los strings a números para poder ser usados
    const aArray2D = string => string.split(",").map(string => Number(string))
    
    //array de meses que uso para convertir el número a su nombre
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    
    const aMensaje = mesAnioVenta => {
        //Uso la info del array 2D para calcular cuánto se vendió en determinado mes/año; al mes le sumo 1 porque en las otras funciones creadas, el parámetro siempre es el número real del mes, no el que se usa en Date
        const resultado = ventasMes(mesAnioVenta[0]+1, mesAnioVenta[1], local)
        //El mes lo calculo con el index 0 de cada array del array 2D
        const mes = meses[mesAnioVenta[0]]
        //El año lo calculo con el index 1 de cada array del array 2D
        const anio = mesAnioVenta[1]
        //Devuelvo un array con strings con la info pertinente
        return `Total de ${mes} de ${anio}: $${resultado}\n`
    }

    //Tranformo el array de strings a un mensaje
    const aString = (mensaje, string) => mensaje + string
    
    const mensaje = mesAnioVentas
                    .map(aArray2D)
                    .map(aMensaje)
                    .reduce(aString)
    
    return mensaje
}


//---------------------------------------------------------------------------------------
//----------------------------renderPorSucursal(local)-----------------------------------
//---------------------------------------------------------------------------------------
const renderPorSucursal = local => {
    const ventaPorSucursal = sucursal => `-Total de ${sucursal}: $${ventasSucursal(sucursal, local)}\n`
    const aString = (listaTotal, sucursalActual) => listaTotal + sucursalActual
    const infoSucursales = local.sucursales
                            .map(ventaPorSucursal)
                            .reduce(aString)

    return `Ventas por sucursal:\n${infoSucursales}`
}

//---------------------------------------------------------------------------------------
//----------------------------render(local)----------------------------------------------
//---------------------------------------------------------------------------------------

//función para hallar a la vendedora que más ingresos generó históricamente
const vendedoraMasIngresos = local => {
    const aVentasTotales = (acumulador, actual) => {
        acumulador[actual.nombreVendedora] === undefined ? 
        acumulador[actual.nombreVendedora] = precioMaquina(actual.componentes, local.precios) : 
        acumulador[actual.nombreVendedora] += precioMaquina(actual.componentes, local.precios)
        return acumulador
    }

    const totalesVendedoras = local.ventas
                                .reduce(aVentasTotales, {})

    const aMejorVendedora = (masVentas, vendedora) =>
        totalesVendedoras[vendedora] > totalesVendedoras[masVentas] ? vendedora : masVentas

    return local.vendedoras.reduce(aMejorVendedora)
}

const render = local => {
    const renderMes = renderPorMes(local)
    const renderSucursal = renderPorSucursal(local)
    const masVendido = componenteMasVendido(local)
    const mejorVendedora = vendedoraMasIngresos(local)


    return `Reporte\n==========================================\n${renderMes}------------------------------------------\n${renderSucursal}------------------------------------------\nProducto estrella: ${masVendido}\n------------------------------------------\nVendedora que más ingresos generó: ${mejorVendedora}`
}