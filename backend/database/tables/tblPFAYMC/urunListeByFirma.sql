SELECT firmaAdi, istekUrun, SUM(isnull(YMaliyet,'0')) AS Toplam, adet, 
    SUM(isnull(YMaliyet,'0'))/adet as ortalamaFiyat
    FROM [dbo].[View_PFAYMCRaporMain] 
    WHERE id = @id AND turu='normal'
    GROUP BY firmaAdi, istekUrun, adet