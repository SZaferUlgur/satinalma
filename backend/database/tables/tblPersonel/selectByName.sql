SELECT [id]
      ,[adiSoyadi]
      ,[sicilNo]
      ,[unvan]
      ,[birimId]
      ,[birim]
      ,[birimBaskani]
      ,[username]
  FROM [dbo].[tblPersonel]
  WHERE [adiSoyadi] = @adiSoyadi