import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EleverApp = () => {
    const [elever, setElever] = useState([]);
    const [navn, setNavn] = useState("");
    const [alder, setAlder] = useState("");
    const [klasse, setKlasse] = useState("");

    const eleverCollection = collection(db, "elever");

    useEffect(() => {
        const hentElever = async () => {
            const data = await getDocs(eleverCollection);
            setElever(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        hentElever();
    }, []);

    const leggTilElev = async () => {
        await addDoc(eleverCollection, { navn, alder, klasse });
        window.location.reload();
    };

    const oppdaterElev = async (id, nyttNavn) => {
        const elevRef = doc(db, "elever", id);
        await updateDoc(elevRef, { navn: nyttNavn });
        window.location.reload();
    };

    const slettElev = async (id) => {
        const elevRef = doc(db, "elever", id);
        await deleteDoc(elevRef);
        window.location.reload();
    };

    return (
        <div>
            <h1>Elevadministrasjon</h1>
            <input placeholder="Navn" value={navn} onChange={(e) => setNavn(e.target.value)} />
            <input placeholder="Alder" value={alder} onChange={(e) => setAlder(e.target.value)} />
            <input placeholder="Klasse" value={klasse} onChange={(e) => setKlasse(e.target.value)} />
            <button id="submit" onClick={leggTilElev}>Legg til elev</button>
            <ul>
                {elever.map((elev) => (
                    <li key={elev.id}>
                        {elev.navn}, {elev.alder}, {elev.klasse}
                        <button id="OpdBtn" onClick={() => oppdaterElev(elev.id, prompt("Nytt navn:"))}>Oppdater</button>
                        <button id="SleBtn" onClick={() => slettElev(elev.id)}>Slett</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EleverApp;
