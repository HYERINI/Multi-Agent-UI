"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DocumentMeta {
    id: number;
    file_name: string;
    s3_key: string;
    uploader_id: number;
}

export default function DocumentListPage() {
    const [documents, setDocuments] = useState<DocumentMeta[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/list`, {
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "문서 목록 불러오기 실패");
            setDocuments(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async (id: number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/analyze/${id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "분석 실패");
            alert("분석 시작됨!");
        } catch (e: any) {
            alert(`분석 실패: ${e.message}`);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">문서 리스트</h1>

            <div className="text-center mb-6">
                <Link
                    href="/documents/register"
                    className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                    문서 업로드
                </Link>
            </div>

            {loading && <p className="text-center text-gray-500">불러오는 중...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => {
                    const s3Url = `https://s3-eddi-lsh-bucket.s3.ap-northeast-2.amazonaws.com/${doc.s3_key}`;
                    return (
                        <div key={doc.id} className="bg-white shadow rounded-lg p-4 flex flex-col">
                            <p className="font-medium text-gray-800">{doc.file_name}</p>
                            <a
                                href={s3Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                열기
                            </a>
                            {/* 분석 버튼 추가 */}
                            <button
                                onClick={() => handleAnalyze(doc.id)}
                                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                                분석
                            </button>
                            <p className="mt-auto text-gray-400 text-sm">Uploader ID: {doc.uploader_id}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
