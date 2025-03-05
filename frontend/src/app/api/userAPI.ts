export const IsLoggedInAPI = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/isloggedin`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return await response.json();
};

export const ForgotPasswordAPI = async ({ email }: { email: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/forgot-password?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const ResetPasswordAPI = async ({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password?token=${token}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, confirmPassword})
    }
  );
  return response.json();
};
