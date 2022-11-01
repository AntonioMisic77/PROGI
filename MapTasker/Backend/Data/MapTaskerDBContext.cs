using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Backend.Models;

namespace Backend.Data
{
    public partial class MapTaskerDBContext : DbContext
    {
        public MapTaskerDBContext()
        {
        }

        public MapTaskerDBContext(DbContextOptions<MapTaskerDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Areas { get; set; } = null!;
        public virtual DbSet<Block> Blocks { get; set; } = null!;
        public virtual DbSet<Building> Buildings { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<MissingReport> MissingReports { get; set; } = null!;
        public virtual DbSet<Operation> Operations { get; set; } = null!;
        public virtual DbSet<Point> Points { get; set; } = null!;
        public virtual DbSet<Region> Regions { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionString");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("Area");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Block>(entity =>
            {
                entity.HasKey(e => e.AreaId)
                    .HasName("PK__Block__70B82048A2F1C5B7");

                entity.ToTable("Block");

                entity.Property(e => e.AreaId).ValueGeneratedNever();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.Area)
                    .WithOne(p => p.Block)
                    .HasForeignKey<Block>(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKBlockId");

                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Blocks)
                    .HasForeignKey(d => d.RegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKBlockRegionId");
            });

            modelBuilder.Entity<Building>(entity =>
            {
                entity.HasKey(e => e.AreaId)
                    .HasName("PK__Building__70B82048E683D700");

                entity.ToTable("Building");

                entity.Property(e => e.AreaId).ValueGeneratedNever();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.Area)
                    .WithOne(p => p.Building)
                    .HasForeignKey<Building>(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BuildingId");

                entity.HasOne(d => d.Block)
                    .WithMany(p => p.Buildings)
                    .HasForeignKey(d => d.BlockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BuildingBlockId");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.UserOib).HasColumnName("UserOIB");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReportId");
            });

            modelBuilder.Entity<MissingReport>(entity =>
            {
                entity.ToTable("MissingReport");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Oib)
                    .HasMaxLength(50)
                    .HasColumnName("OIB");
            });

            modelBuilder.Entity<Operation>(entity =>
            {
                entity.ToTable("Operation");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.LeaderOib).HasColumnName("LeaderOIB");

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.LeaderOibNavigation)
                    .WithMany(p => p.Operations)
                    .HasForeignKey(d => d.LeaderOib)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaderOIB");
            });

            modelBuilder.Entity<Point>(entity =>
            {
                entity.ToTable("Point");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Xcoordinate).HasColumnName("XCoordinate");

                entity.Property(e => e.Ycoordinate).HasColumnName("YCoordinate");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Points)
                    .HasForeignKey(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKAreaId");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.HasKey(e => e.AreaId)
                    .HasName("PK__Region__70B820485B2501DA");

                entity.ToTable("Region");

                entity.Property(e => e.AreaId).ValueGeneratedNever();

                entity.HasOne(d => d.Area)
                    .WithOne(p => p.Region)
                    .HasForeignKey<Region>(d => d.AreaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKRegionId");

                entity.HasOne(d => d.Operation)
                    .WithMany(p => p.Regions)
                    .HasForeignKey(d => d.OperationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("OperationId");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Oib);

                entity.Property(e => e.Oib)
                    .ValueGeneratedNever()
                    .HasColumnName("OIB");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("EMail");

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(20);

                entity.Property(e => e.Username).HasMaxLength(50);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RoleId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
