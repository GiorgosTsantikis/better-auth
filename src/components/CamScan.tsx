'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {useRouter} from "next/navigation";
import {useApi} from "@/hooks/use-api";
import {useJwt} from "@/hooks/use-jwt";

export default function QRScanPage() {
    const qrRef = useRef<HTMLDivElement>(null)
    const [scanned, setScanned] = useState<string | null>(null)
    const [scannerInstance, setScannerInstance] = useState<Html5Qrcode | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [scanning, setScanning] = useState<boolean>(false) // To prevent continuous scanning
    const router = useRouter();
    const jwt = useJwt();

    // Start QR code scanning when component mounts
    const startScan = () => {
        if (!qrRef.current || scanning) return // Don't start if already scanning

        setScanning(true) // Set scanning to true to indicate the scanner is active

        const scanner = new Html5Qrcode(qrRef.current.id)

        // Start scanning using the rear camera (facingMode: 'environment')
        scanner.start(
            { facingMode: 'environment' },
            {
                fps: 5, // Reduce FPS to avoid spamming
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
            async (decodedText) => {
                setScanned(decodedText)
                scanner.stop().catch(console.error) // Stop scanning after successful scan
                setScanning(false) // Set scanning to false after scan
                scanned && await isValidUrl(scanned) && router.push(scanned);
            },
            (err) => {
                setError('No QR code detected, please try again.') // Show error message
                //onsole.error('QR scan error:', err)
            }
        ).catch((err) => {
            setError('Error initializing scanner, please try again.')
            console.error('Error initializing scanner:', err)
            setScanning(false)
        })

        setScannerInstance(scanner)
    }

    async function isValidUrl(url: string):Promise<boolean | undefined>{
        if(jwt.token){
            return !!(await useApi(process.env.NEXT_PUBLIC_BACKEND! + "/isValidRoute", jwt.token, jwt.fetchJWT, {method: "POST", body:url}));
        }
        return undefined;
    }

    // Reset QR scanning
    const resetScan = () => {
        if (scannerInstance) {
            scannerInstance.clear();
            setScanned(null)
            setError(null)
            setScanning(false)
            startScan() // Restart the scan
        }
    }

    // Initialize QR scanner when component mounts
    useEffect(() => {
        startScan()

        // Clean up scanner when the component unmounts
        return () => {
            scannerInstance?.clear();
            scannerInstance?.stop().catch(() => {})
        }
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
            <div id="qr-reader" ref={qrRef} className="w-[300px] h-[300px] border rounded mb-4" />
            {scanned && (
                <div className="mt-4 text-green-600">
                    <p>Scanned:</p>
                    <code>{scanned}</code>
                </div>
            )}
            {error && (
                <div className="mt-4 text-red-600">
                    <p>{error}</p>
                </div>
            )}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={resetScan}>
                Reset Scan
            </button>
        </div>
    )
}

