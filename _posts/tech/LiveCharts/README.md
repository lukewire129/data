---
title: LiveCharts vs LiveCharts2 .NET 차트 라이브러리 비교
subtitle: LiveCharts와 LiveCharts2의 차이점과 선택 가이드
category: technology
tags: ["LiveCharts", "LiveCharts2", ".NET Charts"]
date: '2025-02-26'
---
# LiveCharts vs LiveCharts2: .NET 차트 라이브러리 비교
### LiveCharts와 LiveCharts2의 차이점과 선택 가이드

.NET 개발을 하다 보면 다양한 데이터를 시각적으로 표현해야 할 때가 많습니다. 이럴 때 유용한 라이브러리가 바로 LiveCharts입니다. 하지만 최근에는 **LiveCharts2 (LiveChartsCore)**도 많이 사용되고 있습니다. 이번 글에서는 LiveCharts와 LiveCharts2의 차이점을 비교하고, 어떤 상황에서 어떤 라이브러리를 선택해야 할지 알아보겠습니다.

---

### 1. LiveCharts란?

LiveCharts는 WPF, Windows Forms, UWP 등에서 사용할 수 있는 오픈소스 차트 라이브러리로, **MVVM 친화적인 데이터 바인딩과 부드러운 애니메이션**을 지원합니다.

🔹 **특징**

- WPF, Windows Forms, UWP 지원
- MVVM 기반 데이터 바인딩 (SeriesCollection 사용)
- 애니메이션 지원 (차트 업데이트 시 부드러운 전환 효과)
- 사용자 친화적인 API 제공
- 하지만 많은 데이터 포인트를 처리할 때 성능이 저하될 수 있음
- 더 이상 활발히 유지보수되지 않음

---

### 2. LiveCharts2 (LiveChartsCore)란?

LiveCharts2는 기존 LiveCharts의 한계를 개선한 차트 라이브러리로, **SkiaSharp를 기반으로 한 빠르고 효율적인 렌더링**을 제공합니다. 또한 **다양한 플랫폼을 지원**하여 MAUI, Avalonia, Blazor 등에서도 사용할 수 있습니다.

🔹 **특징**

- SkiaSharp 기반 렌더링으로 성능 개선
- 지원 플랫폼 확장: WPF, WinForms, MAUI, Avalonia, Blazor(WebAssembly), Uno Platform 지원
- 더욱 부드러운 애니메이션 제공
- 실시간 데이터 업데이트 성능 향상
- API 변경으로 인해 기존 LiveCharts 사용자라면 마이그레이션 필요
- 현재 활발히 유지보수 및 개발 중

---

### 3. LiveCharts vs LiveCharts2 비교
|비교항목|LiveCharts (v1)|LiveCharts2 (LiveChartsCore)|
| :--- |:---:|:---:|
|성능|많은 데이터 처리 시 성능 저하|SkiaSharp 기반으로 성능 대폭 개선|
|지원 플랫폼|WPF, WinForms, UWP|WPF, WinForms, MAUI, Avalonia, Uno Platform, Blazor|
|MVVM 지원|O|O|
|애니메이션|기본 제공|개선된 애니메이션 제공|
|유지보수 상태|유지보수 중단|활발한 개발 진행 중|
|API 호환성|기존 방식 유지|새로운 API 구조 적용|

---

### 4. 어떤 라이브러리를 선택해야 할까?

✅ **LiveCharts를 사용해야 할 경우**

- 기존 프로젝트에서 LiveCharts를 사용 중이고, 성능 문제가 크지 않은 경우
- 새로운 차트 라이브러리로의 마이그레이션이 어렵거나 부담스러운 경우

✅ **LiveCharts2를 사용해야 할 경우**

- 새로운 프로젝트를 시작하는 경우 (특히 MAUI, Avalonia, Blazor, Uno Platform 지원 필요 시)
- 실시간 데이터 업데이트가 필요한 경우 (빠른 렌더링 성능이 중요함)
- 큰 규모의 데이터 시각화가 필요한 경우
- 장기적으로 유지보수 및 업데이트를 고려하는 경우


---

### 5. 결론

LiveCharts와 LiveCharts2는 모두 훌륭한 .NET 차트 라이브러리지만, 현재 유지보수 상태와 성능을 고려했을 때 **LiveCharts2가 더 좋은 선택이 될 가능성이 높습니다.**

새로운 프로젝트를 시작한다면 **LiveCharts2를 추천**하며, 기존 프로젝트라면 **성능 문제를 고려하여 LiveCharts2로 마이그레이션할지 결정**하면 좋습니다.

LiveCharts2는 현재도 활발히 개발되고 있으며, 향후 .NET 차트 라이브러리의 표준이 될 가능성이 큽니다. 🚀
