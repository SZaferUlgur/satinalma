SELECT dbo.tblBirimBaskani.id, dbo.tblBirimBaskani.birimId, 
       dbo.tblBirimBaskani.personelId, dbo.tblBirimBaskani.adiSoyadi, 
       dbo.tblPersonel.sicilNo, dbo.tblPersonel.photoURL
    FROM dbo.tblBirimBaskani LEFT OUTER JOIN
    dbo.tblPersonel ON dbo.tblBirimBaskani.personelId = dbo.tblPersonel.id
WHERE dbo.tblBirimBaskani.personelId = @id