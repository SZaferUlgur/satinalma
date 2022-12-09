select firmaAdi, SUM(isnull(YMaliyet,'0')) as Toplam 
    from [dbo].[View_PFAYMCRaporMain] 
    WHERE id = @id AND turu='normal'
    GROUP BY firmaAdi 
    ORDER BY Toplam ASC