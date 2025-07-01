export interface Order {
  id: string;           // Identificador único
  product: string;      // Nombre del producto
  quantity: number;     // Cantidad pedida
  price: number;        // Precio unitario
  date?: Date;          // Fecha del pedido (opcional)
  status?: string; // Estado del pedido
}
