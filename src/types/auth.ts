export interface User {
	email: string;
	name: string;
}

export interface JWTPayload {
	email: string;
	name: string;
	iat: number;
	exp: number;
}

export interface AuthResponse {
	success: boolean;
	message?: string;
	error?: string;
}

export interface LoginResponse extends AuthResponse {
	user?: User;
}

export function getApprovedEmails(): Record<string, string> {
	const approvedUsers = process.env.APPROVED_USERS || '';

	return approvedUsers.split(',').reduce(
		(acc, pair) => {
			const [email, name] = pair.split(':').map(s => s.trim());
			if (email && name) {
				acc[email.toLowerCase()] = name;
			}
			return acc;
		},
		{} as Record<string, string>
	);
}
