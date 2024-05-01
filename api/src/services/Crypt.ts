import bcrypt from 'bcrypt';

export default class Crypt {
    public static async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

   public static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.error('Error verifying password:', error);
            return false;
        }
    }
}
