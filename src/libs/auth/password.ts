import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10); // генерируем соль - шум для защиты
    return await bcrypt.hash(password, salt); // хешируем (соль + пароль). 
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword); // проверяем пароль
}
