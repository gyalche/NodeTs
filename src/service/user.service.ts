import DocumentDefination from 'mongoose';
import user, { UserDocument } from '../model/user.model';

export async function createUser(
  input: DocumentDefination<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'confirmPassword'>
  >
) {
  try {
    return await user.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
