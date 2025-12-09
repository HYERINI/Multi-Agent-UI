import { Suspense } from "react";
import PaymentFailClient from "./PaymentFailClient";

export default function PaymentFailPage() {
    return (
        <Suspense fallback={<div>결제 실패 정보 불러오는 중...</div>}>
            <PaymentFailClient />
        </Suspense>
    );
}
