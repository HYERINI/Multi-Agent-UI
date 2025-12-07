"use client";

export default function LoginPage() {
    const handleGoogleLogin = () => {
        window.location.href =
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH}`;
    };

    const handleKakaoLogin = () => {
        window.location.href =
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_KAKAO_LOGIN_PATH}`;
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <button
                onClick={handleGoogleLogin}
                className="bg-red-600 text-white px-6 py-3 rounded font-bold w-64 hover:opacity-90 transition"
            >
                Google Login
            </button>

            <button
                onClick={handleKakaoLogin}
                className="bg-yellow-300 text-black px-6 py-3 rounded font-bold w-64 hover:opacity-90 transition"
            >
                Kakao Login
            </button>
        </div>
    );
}
