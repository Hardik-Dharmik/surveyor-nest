export class BaseUser {
  id?: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  designation?: string;
}

export class CreateUserDto extends BaseUser {
  createdAt: Date;
}

export class UpdateUserDto extends BaseUser {
  updatedAt: Date;
}
