SELECT [id]
      ,[personelId]
      ,[sicilNo]
      ,[adiSoyadi]
      ,[ebysSayi]
      ,[picturePath]
      ,[aktif_flag]
  FROM [dbo].[tblMuhasebeYetkili]
  WHERE [aktif_flag]='A'