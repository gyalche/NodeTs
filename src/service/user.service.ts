import DocumentDefination from 'mongoose';
import user, { UserDocument } from '../model/user.model';
import { omit } from 'lodash';

export async function createUser(
  input: DocumentDefination<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'confirmPassword'>
  >
) {
  try {
    const User = await user.create(input);
    return omit(User.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const User = await user.findOne({ email });

  if (!User) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  return omit(User.toJSON(), 'password');
}
