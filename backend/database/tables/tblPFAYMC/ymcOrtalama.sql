SELECT firmaAdi, sum(isnull(YMaliyet/adet,'0')) AS ToplamBirimFiyat, 
    sum(isnull(YMaliyet,'0')) AS ToplamMaliyet 
    FROM [dbo].[View_PFAYMCRaporMain] 
    WHERE id=@id 
    GROUP BY firmaAdi, turu