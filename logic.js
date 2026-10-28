export const stageMatrix={T1a:['IA1','IIA','IIB','IIIA','IIIB'],T1b:['IA2','IIA','IIB','IIIA','IIIB'],T1c:['IA3','IIA','IIB','IIIA','IIIB'],T2a:['IB','IIB','IIIA','IIIB','IIIB'],T2b:['IIA','IIB','IIIA','IIIB','IIIB'],T3:['IIB','IIIA','IIIA','IIIB','IIIC'],T4:['IIIA','IIIA','IIIB','IIIB','IIIC']};
export function stageGroup(t,n,m){
 if(!['N0','N1','N2a','N2b','N3'].includes(n)||!['M0','M1a','M1b','M1c1','M1c2'].includes(m))return null;
 if(t==='Tis'||t==='T1mi') return n==='N0'&&m==='M0'?(t==='Tis'?'0':'IA1'):null;
 if(!stageMatrix[t])return null;
 if(m!=='M0')return ['M1a','M1b'].includes(m)?'IVA':'IVB';
 return stageMatrix[t][['N0','N1','N2a','N2b','N3'].indexOf(n)];
}
const result=(kind,title,body,refs)=>({kind,title,body,refs});
const targets={
 egfr:['常見敏感 EGFR 突變','EGFR Ex19del／L858R：以 osimertinib 等 EGFR 導向療法為核心，亦可依負荷、適治性及最新指引討論組合方案。PD-L1 高不改變先看驅動基因的原則。'],
 exon20:['EGFR exon20 insertion','與 Ex19del／L858R 分開。討論 amivantamab＋含鉑／pemetrexed 等 exon20 專屬策略；不同插入位置及線別需精確核對。'],
 alk:['ALK 融合','討論 alectinib、brigatinib 或 lorlatinib 等；考慮腦轉移活性、神經認知／代謝毒性、共病與藥物可近性。'],
 ros1:['ROS1 融合','依既往治療與 CNS 狀態討論 repotrectinib、entrectinib、crizotinib 等 ROS1 TKI；非所有 TKI 中樞活性相同。'],
 braf:['BRAF V600E','討論 BRAF／MEK 合併抑制，例如 dabrafenib＋trametinib。非 V600E 變異不能直接類推。'],
 met:['MET exon14 skipping','討論 capmatinib／tepotinib 等。MET 擴增或蛋白高表現不可當成 exon14 skipping。'],
 ret:['RET 融合','討論 selpercatinib 等 RET 導向療法，核對 CNS、交互作用與既往藥物。'],
 ntrk:['NTRK 融合','確認可作用的 NTRK 融合後，討論 larotrectinib／entrectinib 等；非所有 NTRK 變異都等效。'],
 kras:['KRAS G12C','第一線仍依無可用第一線驅動治療之路徑評估免疫／化療；後線可討論 G12C 抑制劑，如 sotorasib／adagrasib。依最新線別證據、許可與臨床試驗確認。'],
 her2:['ERBB2／HER2 活化突變','討論既往治療後 HER2 導向策略，如 trastuzumab deruxtecan；須查當期線別與許可，注意間質性肺病。不可將 HER2 突變、擴增與 IHC 表現互換。']
};
export function decide(s){
 if(s.emergency)return result('urgent','先處理急症',['大咳血、氣道阻塞、脊髓壓迫、症狀性腦轉移或嚴重低血氧需即時臨床評估；不要等待網頁分流。'],['esmoearly']);
 if(!s.hist||!s.setting||!s.ps)return result('incomplete','請完成必要條件',['選擇病理、臨床情境與 ECOG。所有選項僅供模擬，不輸入真實病人資料。'],['esmoearly']);
 if(s.phase==='postcrt'&&!['unresect','limited'].includes(s.setting))return result('mismatch','治療階段與情境不一致',['放化療後鞏固請選不可切除局部晚期 NSCLC 或有限期 SCLC；轉移性初治與進展需選相應階段。'],['esmoearly','adriatic']);
 if(s.hist==='nos')return result('testing','先完成病理分類',['請病理科覆核形態、必要 IHC 及檢體量；NSCLC-NOS 不宜直接套用腺癌或鱗癌療程。'],['who']);
 const sclc=s.hist==='sclc';
 if(sclc!==['limited','extensive'].includes(s.setting))return result('mismatch','病理與臨床情境不一致',['SCLC 請選有限期或擴散期；NSCLC 請選相應的可切除性／轉移情境。'],['esmosclc','esmoearly']);
 if(s.phase==='progressed')return result('progression','重新評估進展與抗藥性',['區分寡進展、廣泛惡化、治療毒性或其他病因。記錄既往藥物、反應與停藥間隔；NSCLC 必要時重新組織／血液分子檢測並排除小細胞轉化。','SCLC 復發依治療間隔、PS、器官功能討論含鉑再挑戰、其他後線（如 topotecan、lurbinectedin 或 tarlatamab 之適用性）及臨床試驗；這些選項不表示台灣已許可或給付。'],['esmotarget','ncisclc']);
 if(s.ps==='poor'||s.ps==='two')return result('individual','需個別化適治性評估',['ECOG ≥2 的原因、可逆性、器官功能與病人目標須先釐清；不自動套用良好 PS 的合併療法。','若 PS 差主要來自可治療的腫瘤，驅動基因標靶或 SCLC 治療仍可能有角色；須由專科評估。同步提供症狀與緩和照護。'],['esmotarget','esmosclc','asco']);
 if(sclc){
 if(s.setting==='limited')return result('limited','有限期 SCLC：以根治性多模式治療為目標',['適合者同步含鉑／etoposide＋胸部放療；極早期 T1–2N0 才可在完整縱膈分期後討論手術加輔助化療。','同步放化療後無惡化者依 ADRIATIC 討論 durvalumab 鞏固。PCI 與腦 MRI 監測需共同決策；高齡及認知風險另評估。','PD-L1 不作例行必要分流；有限期鞏固健保本版待核對。'],['esmosclc','adriatic','esmoadriatic']);
 return result('extensive','擴散期 SCLC：全身治療與症狀支持',['適合免疫者討論 atezolizumab＋carboplatin／etoposide 或 durvalumab＋含鉑／etoposide，後續免疫維持；免疫禁忌時評估含鉑／etoposide。','評估腦部病灶、電解質、骨髓及器官功能；不等待 PD-L1 才治療。腦 MRI 監測、PCI 或胸部放療依反應與個案討論。','健保另有 CNS 等限制，請開啟台灣健保頁核對完整條文。'],['esmosclc','ncisclc','nhiici']);
 }
 if(s.setting==='early')return result('early','早期 NSCLC：確認根治性局部治療',['完整分期、肺功能與心肺風險後，適合手術者評估切除加淋巴結評估；無法手術者討論 SBRT。','術後需依 pTNM、切緣、風險與 EGFR／ALK 等標記評估輔助治療；IA 病人不常規給輔助化療。此表單未輸入完整 pTNM，不能開出輔助療程。'],['esmoearly','nci']);
 if(s.setting==='resect')return result('resect','可切除局部／淋巴結陽性 NSCLC',['先由 MDT 確認可切除性與侵入性縱膈分期；分期數字不等同可切除。','依腫瘤大小、N站、EGFR／ALK 與試驗條件，討論術前／圍手術期免疫含鉑策略或手術後輔助化療與標記導向治療。不要直接把 TNM9 期別對應到舊試驗期別。','術前保留足夠檢體檢測 EGFR／ALK；適用族群可於術後討論 osimertinib 或 alectinib 等，需精確核對期別、切除與當期指引。'],['esmoearly','nccn','nci']);
 if(s.setting==='unresect'){
 let body=['適治者以根治性同步含鉑放化療為核心；無法耐受者討論序列或其他個別化策略。','放化療後先確認是否惡化與肺毒性，再決定鞏固；尚未完成分期或標記者先補足。'];
 if(s.phase==='postcrt')body=s.marker==='egfr'?['EGFR Ex19del／L858R 病人在根治性放化療後無惡化，討論 osimertinib 鞏固證據；本表單不能確認個案符合完整納入條件。','此情境和轉移性第一線不同，台灣給付須獨立核對。']:s.marker==='none'?['無適用驅動標記者，根治放化療後無惡化且毒性允許時，評估 durvalumab 鞏固。','健保 PD-L1、基因原生型、同步療程與期限有個別限制，詳見台灣健保。']:['先確認放化療後影像、肺毒性及 EGFR／ALK 等標記。未知不能視為陰性；其他驅動標記由 MDT 個別討論鞏固策略。'];
 return result('unresect','不可切除 NSCLC：放化療與鞏固分開評估',body,['esmoearly','nci','nhiici']);
 }
 if(!s.marker||s.marker==='unknown')return result('testing','先補足驅動基因結果',['病況穩定者先完成廣泛分子檢測及 PD-L1。DNA＋RNA 有助識別融合與跳躍變異；組織不足可補血液，但陰性需考慮組織驗證。','重症無法等待時，由 MDT 決定暫行治療；本網站不自動推薦免疫單藥。'],['asco','esmotarget']);
 if(targets[s.marker])return result('target',targets[s.marker][0], [targets[s.marker][1],'先確認變異、檢測品質、既往治療、CNS、器官功能與病人意願。清單為教學例示，不是完整偏好排序或處方。'],['esmotarget','nccn','nci']);
 if(!s.pdl||s.pdl==='unknown')return result('pdl','補足 PD-L1 與治療禁忌評估',['無可作用驅動標記不等於可直接指定免疫單藥；取得 PD-L1 並評估自體免疫疾病、器官移植及肺炎病史。'],['asco']);
 const chemo=s.hist==='squamous'?'含鉑＋taxane 類':'含鉑＋pemetrexed';
 return result('immune','無可作用驅動標記：依 PD-L1 與疾病負荷選擇',[s.pdl==='high'?'PD-L1 TPS ≥50%：適合者可討論免疫單藥；快速進展或高負荷者也可考慮免疫合併化療。':'PD-L1 TPS 1–49% 或 <1%：多數適治者討論免疫合併化療，不因低表現就認定完全無免疫效益。',`本病理可討論 ${chemo} 合併適當免疫藥。pemetrexed 不用於鱗癌；免疫禁忌者另評估化療策略。`,'國際門檻不等於健保門檻。肝腎功能、免疫禁忌、出血與共病須由醫師評估。'],['asco','nci','nhiici']);
}
export function grade(qs,answers){if(answers.length!==qs.length||Array.from(answers).some(a=>!Number.isInteger(a)||a<0||a>3))return null;const correct=qs.reduce((n,q,i)=>n+(q.answer===answers[i]?1:0),0);return {correct,total:qs.length,score:Math.round(correct/qs.length*100)};}
