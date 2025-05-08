export interface UserFilters { 
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

export type UsersTableFilterOption = 'all' | 'isBlocked' | 'isNotBlocked'

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string 
  isBlocked: boolean;
  roles: Role[]; 
  phoneNumber: string;
}
// Интерфейс метаинформации

export interface MetaResponse<T> { 
  data: T[]
  meta: {   
    totalAmount: number;   
    sortBy: string;   
    sortOrder: 'asc' | 'desc'; 
  }
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {  
  roles: Role[]  // при вызове этой апи роли будут обновлены к тому массиву который будет передан
// например если у вас была roles: ['ADMIN'] а вы хотите добавить ['MODERATOR'] то нужно передавать 
// старые + новые - roles: ['ADMIN', 'MODERATOR'] 
}

// Интерфейс для обновления данных пользователя
export interface UserRequest{  
   username?: string; 
   email?: string; 
   phoneNumber?: string;
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR'