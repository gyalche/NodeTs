import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

/**
 * @openapi
 * components:
 * schemas:
 * CreateUserInput:
 * type:Object
 * required:
 *  -email
 *  -password
 * properties:
 *  email:
 *    type:string
 *    default:jan.doe@example.com
 *  password:
 *    type:string
 *    default:StrongPassword123
 */
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hashSync(this.password, salt);
  this.password = hashPassword;
  return next();
});

//password compare;
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password).catch((e) => false);
};
const user = mongoose.model<UserDocument>('user', userSchema);

export default user;
/**
 * @openapi
 * components:
 *  schemas:
 *    Product:
 *      type:object
 *      required:
 *        -title
 *        -description
 *        -price
 *        -image
 *      properties:
 *        title:
 *           type:string
 *        description:
 *           type:string
 *        price:
 *           type:number
 *        image:
 *           type:string
 *
 */
