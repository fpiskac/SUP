using Microsoft.EntityFrameworkCore;
using PekaraAPI.Models;

namespace PekaraAPI.Data
{
    public class PekaraDbContext : DbContext
    {
        public PekaraDbContext(DbContextOptions<PekaraDbContext> options)
            : base(options)
        {
        }

        // DbSetovi (TABLICE)

        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Sastojak> Sastojci { get; set; }
        public DbSet<Recept> Recepti { get; set; }
        public DbSet<ReceptSastojak> ReceptSastojci { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Smjena> Smjene { get; set; }
        public DbSet<Evidencija> Evidencije { get; set; }

        // KONFIGURACIJA

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // RECEPT_SASTOJAK (COMPOSITE KEY)

            modelBuilder.Entity<ReceptSastojak>()
                .HasKey(rs => new { rs.IdRecept, rs.IdSastojak });

            modelBuilder.Entity<ReceptSastojak>()
                .HasOne(rs => rs.Recept)
                .WithMany(r => r.ReceptSastojci)
                .HasForeignKey(rs => rs.IdRecept)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReceptSastojak>()
                .HasOne(rs => rs.Sastojak)
                .WithMany(s => s.ReceptSastojci)
                .HasForeignKey(rs => rs.IdSastojak)
                .OnDelete(DeleteBehavior.Restrict);

            // PROIZVOD → RECEPT

            modelBuilder.Entity<Proizvod>()
                .HasOne(p => p.Recept)
                .WithMany(r => r.Proizvodi)
                .HasForeignKey(p => p.IdRecept)
                .OnDelete(DeleteBehavior.SetNull);

            // EVIDENCIJA RELACIJE

            modelBuilder.Entity<Evidencija>()
                .HasOne(e => e.Smjena)
                .WithMany(s => s.Evidencije)
                .HasForeignKey(e => e.IdSmjena)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Evidencija>()
                .HasOne(e => e.Proizvod)
                .WithMany(p => p.Evidencije)
                .HasForeignKey(e => e.IdProizvod)
                .OnDelete(DeleteBehavior.Cascade);

            // DVA FK NA KORISNIKA

            modelBuilder.Entity<Evidencija>()
                .HasOne(e => e.Radnik)
                .WithMany(k => k.RadnikEvidencije)
                .HasForeignKey(e => e.IdRadnik)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Evidencija>()
                .HasOne(e => e.Prodavac)
                .WithMany(k => k.ProdavacEvidencije)
                .HasForeignKey(e => e.IdProdavac)
                .OnDelete(DeleteBehavior.Restrict);

            // DEFAULT VALUES

            modelBuilder.Entity<Evidencija>()
                .Property(e => e.Proizvedeno)
                .HasDefaultValue(0);

            modelBuilder.Entity<Evidencija>()
                .Property(e => e.Prodano)
                .HasDefaultValue(0);

            // INDEXI (PERFORMANSE)

            modelBuilder.Entity<Korisnik>()
                .HasIndex(k => k.KorisnickoIme)
                .IsUnique();

            modelBuilder.Entity<Smjena>()
                .HasIndex(s => s.Datum);

            modelBuilder.Entity<Proizvod>()
                .HasIndex(p => p.Naziv);

            modelBuilder.Entity<Sastojak>()
                .HasIndex(s => s.Naziv);

            // PRECIZNOST DECIMALA

            modelBuilder.Entity<Sastojak>()
                .Property(s => s.CijenaPoJedinici)
                .HasPrecision(10, 4);

            modelBuilder.Entity<Sastojak>()
                .Property(s => s.CijenaNabave)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Proizvod>()
                .Property(p => p.ProdajnaCijena)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Proizvod>()
                .Property(p => p.IzradaCijena)
                .HasPrecision(10, 2);

            modelBuilder.Entity<ReceptSastojak>()
                .Property(rs => rs.Kolicina)
                .HasPrecision(10, 3);
        }
    }
}