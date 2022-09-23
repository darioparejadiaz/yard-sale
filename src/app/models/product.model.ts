//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// Interfaces definition

interface Category{
  id: string;
  name: string;
  typeImg: string;
}

//************************* */

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  tax?: number;
}

//************************* */

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: string;
}

//************************* */

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }

//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
