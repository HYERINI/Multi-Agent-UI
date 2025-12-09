import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>결제 승인 처리 중...</div>}>
            <PaymentSuccessClient />
        </Suspense>
    );
}
