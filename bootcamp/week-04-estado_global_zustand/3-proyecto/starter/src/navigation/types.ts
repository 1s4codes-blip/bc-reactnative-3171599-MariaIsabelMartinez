// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.
// Dominio: Empresa de Importación (productos, envíos, aduanas)

export type RootTabParamList = {
  Products: undefined;
  Shipments: undefined;
};

export type ProductsStackParamList = {
  ProductList: undefined;
  ProductDetail: {
    id: string;
    name: string;
    supplier: string;
    originCountry: string;
    price: number;
  };
};
