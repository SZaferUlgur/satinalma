CREATE PROCEDURE [dbo].[newDtsInfoSP]
@perId int
AS
DECLARE @perAdiSoyadi varchar(150)
DECLARE @perBirimId int
DECLARE @perBirimBaskani varchar(150)
DECLARE @perUserName as varchar(25)
BEGIN
SELECT	@perAdiSoyadi=adiSoyadi, @perBirimId=birimId, @perBirimBaskani=birimBaskani, 
		@perUserName=username FROM tblPersonel WHERE id=@perId
SELECT 
	@perAdiSoyadi as personelAdiSoyadi,
	@perUserName as personelUserName,
	(SELECT kurumAdi FROM dbo.tblKurum) AS kurumAdi,
    (SELECT genelSekreter FROM dbo.tblGS) AS genelSekreter,
    (SELECT unvan FROM dbo.tblPersonel WHERE (adiSoyadi = (SELECT genelSekreter FROM dbo.tblGS AS tblGS_1))) AS gorevi,
    (SELECT birim FROM dbo.tblPersonel AS tblPersonel_2 WHERE (adiSoyadi = @perAdiSoyadi)) AS birim,
    (SELECT adiSoyadi FROM dbo.tblBirimBaskani WHERE (birimId = @perBirimId)) AS birimBaskani,
    (SELECT unvan FROM dbo.tblPersonel AS tblPersonel_1 WHERE (adiSoyadi = @perBirimBaskani)) AS unvani,
    (SELECT adiSoyadi FROM dbo.tblMuhasebeYetkili WHERE (aktif_flag = 'A')) AS muhasebeYetkilisi
END