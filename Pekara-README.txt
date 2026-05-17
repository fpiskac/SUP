# PekaraApp

Aplikacija za upravljanje pekarom izrađena u:

* React (frontend)
* ASP.NET Core Web API (backend)
* PostgreSQL (baza podataka)



# TEHNOLOGIJE

## Frontend

* React
* Vite
* Axios
* React Router DOM

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* JWT autentifikacija

## Baza podataka

* PostgreSQL

---

# PREUZIMANJE PROJEKTA

```bash
git clone https://github.com/fpiskac/SUP.git
```

Otvoriti projekt u:

* Visual Studio 2022
  ili
* Visual Studio Code

---

# POKRETANJE BAZE PODATAKA

Potrebno je imati instaliran:

* PostgreSQL
* pgAdmin 4

---

# 1. KREIRANJE BAZE

U PostgreSQL napraviti novu bazu:

```sql
CREATE DATABASE pekaradb;
```

---

# 2. POKRETANJE SQL SKRIPTE

Otvoriti Query Tool i pokrenuti sljedeću skriptu.

---

# SQL SKRIPTA ZA TABLICE

```sql
CREATE TABLE korisnik (
    id_korisnik SERIAL PRIMARY KEY,
    ime VARCHAR(100),
    korisnicko_ime VARCHAR(100),
    lozinka_hash VARCHAR(100),
    uloga VARCHAR(50)
);

CREATE TABLE recept (
    id_recept SERIAL PRIMARY KEY,
    naziv VARCHAR(100),
    broj_komada INTEGER,
    ukupna_cijena DECIMAL
);

CREATE TABLE sastojak (
    id_sastojak SERIAL PRIMARY KEY,
    naziv VARCHAR(100),
    kolicina_nabave DECIMAL,
    cijena_nabave DECIMAL,
    cijena_po_jedinici DECIMAL
);

CREATE TABLE recept_sastojak (
    id_recept INTEGER REFERENCES recept(id_recept),
    id_sastojak INTEGER REFERENCES sastojak(id_sastojak),
    kolicina DECIMAL,
    PRIMARY KEY(id_recept, id_sastojak)
);

CREATE TABLE proizvod (
    id_proizvod SERIAL PRIMARY KEY,
    naziv VARCHAR(100),
    tezina_po_komadu DECIMAL,
    prodajna_cijena DECIMAL,
    izrada_cijena DECIMAL,
    id_recept INTEGER REFERENCES recept(id_recept),
    cijena_po_kg DECIMAL,
    prodajna_po_kg DECIMAL
);

CREATE TABLE smjena (
    id_smjena SERIAL PRIMARY KEY,
    datum DATE,
    tip_smjene VARCHAR(50)
);

CREATE TABLE evidencija (
    id_evidencija SERIAL PRIMARY KEY,
    id_smjena INTEGER REFERENCES smjena(id_smjena),
    id_proizvod INTEGER REFERENCES proizvod(id_proizvod),
    proizvedeno INTEGER,
    prodano INTEGER,
    id_radnik INTEGER REFERENCES korisnik(id_korisnik),
    id_prodavac INTEGER REFERENCES korisnik(id_korisnik)
);
```

---

# POČETNI PODACI

```sql
INSERT INTO korisnik
(ime, korisnicko_ime, lozinka_hash, uloga)
VALUES
('Admin', 'admin', 'admin', 'admin'),
('Radnik', 'radnik', 'radnik', 'radnik'),
('Prodavac', 'prodavac', 'prodavac', 'prodavac');

INSERT INTO sastojak
(naziv, kolicina_nabave, cijena_nabave, cijena_po_jedinici)
VALUES
('Brasno', 25000, 20, 0.0008),
('Sol', 1000, 2, 0.002),
('Kvasac', 500, 5, 0.01);

INSERT INTO recept
(naziv, broj_komada, ukupna_cijena)
VALUES
('Kruh recept', 10, 5);

INSERT INTO recept_sastojak
(id_recept, id_sastojak, kolicina)
VALUES
(1, 1, 5000),
(1, 2, 100),
(1, 3, 50);

INSERT INTO proizvod
(naziv, tezina_po_komadu, prodajna_cijena,
 izrada_cijena, id_recept,
 cijena_po_kg, prodajna_po_kg)
VALUES
('Bijeli kruh', 500, 2, 0.5, 1, 1, 4);
```

---

# PODEŠAVANJE CONNECTION STRINGA

U backend projektu otvoriti:

```text
appsettings.json
```
!!Podaci dolje su samo dani samo kao primjer, poterbno upisati vlastiti localhost,port i ostalo!!
Postaviti:

```json
{
  "ConnectionStrings": {
    "DefaultConnection":
      "Host=localhost;Port=5432;Database=pekaradb;Username=postgres;Password=VAŠA_LOZINKA"
  }
}
```

---

# POKRETANJE BACKENDA

Otvoriti terminal u:

```text
PekaraAPI
```

Pokrenuti:

```bash
dotnet restore
dotnet run
```

Backend će biti dostupan na:

```text
https://localhost:5009
```

Swagger:

```text
https://localhost:5009/swagger
```

---

# POKRETANJE FRONTENDA

Otvoriti terminal u:

```text
pekara-frontend
```

Instalirati pakete:

```bash
npm install
```

Pokrenuti aplikaciju:

```bash
npm run dev
```

Frontend će biti dostupan na:

```text
http://localhost:5173
```

---

# LOGIN PODACI

## Admin

```text
Korisničko ime: admin
Lozinka: admin
```

## Radnik

```text
Korisničko ime: radnik
Lozinka: radnik
```

## Prodavač

```text
Korisničko ime: prodavac
Lozinka: prodavac
```

---

# TESTIRANJE

Projekt koristi:

* xUnit
* Entity Framework InMemory Database

---

# POKRETANJE TESTOVA

Otvoriti terminal u root test folderu projekta:

```bash
dotnet test
```

---

# IMPLEMENTIRANI TESTOVI

## Jedinični testovi

* poslovna logika
* kontroleri
* pristup podacima

## Integracijski testovi

* povezivanje:

  * kontrolera
  * Entity Frameworka
  * baze podataka

---

# FUNKCIONALNOSTI SUSTAVA

## Admin

* upravljanje korisnicima
* upravljanje sastojcima
* upravljanje receptima
* upravljanje proizvodima
* pregled evidencije

## Radnik

* unos proizvedenih proizvoda po smjeni

## Prodavač

* unos prodanih proizvoda po smjeni

---

# ARHITEKTURA

Projekt koristi:

* MVC
* REST API
* JWT autentifikaciju
* React frontend + ASP.NET backend arhitekturu
