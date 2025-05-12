import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(Backend) // For loading translations from http
	.use(LanguageDetector) // For detecting user language
	.use(initReactI18next) // Passes i18n down to react-i18next
	.init({
		fallbackLng: "en", // Default language if user's language is not available
		debug: true, // Enable for debugging purposes
		resources: {
			en: {
				translation: {
					learn: "this is a test",
					alert:
						"You just entered an Autovizually chart. For information on how to interact with it, press the question mark key to open the shortcut guide",
					sg_title: "Shortcut guide",
					close_shortcut_guide_label: "Close shortcut guide",
					sg_access_title: "Access the guide",
					sg_enter_description: "Enter shortcut guide",
					sg_leave_description: "Leave shortcut guide",
					sg_move_elements_title: "Move between page elements",
					sg_get_into_chart: "Get into a chart",
					sg_get_out_of_chart: "Get out of a chart",
					sg_move_forward: "Move forward in a page element",
					sg_move_backward: "Move backward in a page element",
					sg_move_series: "Move between series of data inside the chart",
					sg_chart_nav_title: "Chart navigation shortcuts",
					sg_jump_beginning: "Jump to the beginning of a chart",
					sg_jump_end: "Jump to the end of a chart",
					sg_define_jump_points: "Define the number of data points to be jumped at a time",
					sg_add_jump_point: "Add one number to the data points to be jumped at a time",
					sg_subtract_jump_point: "Subtract one number to the data points to be jumped at a time",
					sg_stats_nav_title: "Statistical insights (works when navigating a chart)",
					sg_minimum: "Minimum",
					sg_average: "Average",
					sg_maximum: "Maximum",
					sg_stats_focused_title: "Statistical insights (works when a chart element is focused)",
					sg_compare_minimum: "Compare current data element to minimum value",
					sg_compare_average: "Compare current data element to average value",
					sg_compare_maximum: "Compare current data element to maximum value",
					sg_compare_rest: "Compare current data element to the rest of the chart",
					sg_change_desc_title: "Change chart descriptions",
					sg_longer_desc: "Set longer description of the chart",
					sg_shorter_desc: "Set shorter description of the chart (default)",
					sg_description:
						"AutoVizually shortcut guide. AutoVizually lets you navigate between charts and underlying data elements using just the keyboard. When focused on a chart, a description regarding the data will be provided — you might receive a notification indicating that the chart description was produced by an AI model. For JAWS and NVDA users, it is recommended to turn Focus mode before navigating the data using the arrow keys.",
				},
			},
			pt: {
				translation: {
					learn: "isto é um teste",
					alert:
						"Acabou de entrar num gráfico Autovizually. Para obter informações sobre como interagir com o mesmo, prima a tecla de ponto de interrogação para abrir o guia de atalhos.",
					sg_title: "Guia de atalhos",
					close_shortcut_guide_label: "Fechar guia de atalhos",
					sg_access_title: "Aceder ao guia",
					sg_enter_description: "Abrir guia de atalhos",
					sg_leave_description: "Sair do guia de atalhos",
					sg_move_elements_title: "Mover entre elementos da página",
					sg_get_into_chart: "Entrar num gráfico",
					sg_get_out_of_chart: "Sair de um gráfico",
					sg_move_forward: "Avançar num elemento da página",
					sg_move_backward: "Recuar num elemento da página",
					sg_move_series: "Mover entre séries de dados dentro do gráfico",
					sg_chart_nav_title: "Atalhos de navegação do gráfico",
					sg_jump_beginning: "Saltar para o início de um gráfico",
					sg_jump_end: "Saltar para o fim de um gráfico",
					sg_define_jump_points: "Definir o número de pontos de dados a serem saltados de cada vez",
					sg_add_jump_point: "Adicionar um número aos pontos de dados a serem saltados de cada vez",
					sg_subtract_jump_point:
						"Subtrair um número aos pontos de dados a serem saltados de cada vez",
					sg_stats_nav_title: "Informações estatísticas (funciona ao navegar num gráfico)",
					sg_minimum: "Mínimo",
					sg_average: "Média",
					sg_maximum: "Máximo",
					sg_stats_focused_title:
						"Informações estatísticas (funciona quando um elemento do gráfico está focado)",
					sg_compare_minimum: "Comparar o elemento de dados atual com o valor mínimo",
					sg_compare_average: "Comparar o elemento de dados atual com o valor médio",
					sg_compare_maximum: "Comparar o elemento de dados atual com o valor máximo",
					sg_compare_rest: "Comparar o elemento de dados atual com o resto do gráfico",
					sg_change_desc_title: "Alterar descrições do gráfico",
					sg_longer_desc: "Definir descrição mais longa do gráfico",
					sg_shorter_desc: "Definir descrição mais curta do gráfico (padrão)",
					sg_description:
						"Guia de atalhos AutoVizually. O AutoVizually permite navegar entre gráficos e elementos de dados subjacentes usando apenas o teclado. Quando o foco está num gráfico, será fornecida uma descrição sobre os dados — poderá receber uma notificação indicando que a descrição do gráfico foi produzida por um modelo de IA. Para utilizadores de JAWS e NVDA, recomenda-se ativar o modo de Foco antes de navegar pelos dados usando as teclas de seta.",
				},
			},
		},
	});

export default i18n;
