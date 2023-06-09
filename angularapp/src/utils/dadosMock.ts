export const users = [
  {
    id: 1,
    email: 'john.doe@example.com',
    password: 'password123',
    cpf: '123.456.789-00',
    cnpj: '12.345.678/0001-90',
    phone: '+1 234-567-890',
    fullname: 'John Doe',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    password: 'pass456',
    cpf: '987.654.321-00',
    cnpj: '98.765.432/0001-21',
    phone: '+1 987-654-321',
    fullname: 'Jane Smith',
  },
];

export const properties = [
  {
    id: 1,
    id_user: 1,
    name: 'Casa aconchegante',
    type: 'Casa',
    totalarea: 200,
    bedrooms: 3,
    bathrooms: 2,
    cargarage: 2,
    pets: true,
    rent: true,
    furniture: false,
    price: 2500.00,
    street: 'Rua Principal',
    number: '123',
    neighborhood: 'Centro',
    city: 'Cidade',
    state: 'Estado',
    zipcode: '12345-678',
    complement: 'Próximo ao parque',
    description: 'Uma casa espaçosa e bem iluminada.',
    photos: [
      {
        id: 1,
        id_property: 1,
        thumbnail: true,
        path: 'assets/photos/photo1.jpg',
        caption: 'Fachada da casa',
      },
      {
        id: 2,
        id_property: 1,
        thumbnail: false,
        path: 'assets/photos/photo2.jpg',
        caption: 'Sala de estar',
      },
    ],
    user: {
      id: 1,
      email: 'john.doe@example.com',
      password: 'password123',
      cpf: '123.456.789-00',
      cnpj: '12.345.678/0001-90',
      phone: '+1 234-567-890',
      fullname: 'John Doe',
    },
  },
  {
    id: 2,
    id_user: 2,
    name: 'Apartamento moderno',
    type: 'Apartamento',
    totalarea: 80,
    bedrooms: 2,
    bathrooms: 1,
    cargarage: 1,
    pets: false,
    rent: true,
    furniture: false,
    price: 1800.00,
    street: 'Avenida Secundária',
    number: '456',
    neighborhood: 'Bairro Novo',
    city: 'Cidade',
    state: 'Estado',
    zipcode: '98765-432',
    complement: 'Próximo ao metrô',
    description: 'Um apartamento bem localizado e com ótima vista.',
    photos: [
      {
        id: 3,
        id_property: 2,
        thumbnail: true,
        path: 'assets/photos/photo3.jpg',
        caption: 'Fachada do prédio',
      },
    ],
    user: {
      id: 2,
      email: 'jane.smith@example.com',
      password: 'pass456',
      cpf: '987.654.321-00',
      cnpj: '98.765.432/0001-21',
      phone: '+1 987-654-321',
      fullname: 'Jane Smith',
    },
  },
];

