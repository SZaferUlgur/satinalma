SELECT SUM(ISNULL(yaklasikMaliyet, '0')) / SUM(ISNULL(adet, '0')) AS sozluYaklasikMaliyet
    FROM dbo.tblPFAYMC
    WHERE (dtsId = @id) AND (turu = 'sozlu')