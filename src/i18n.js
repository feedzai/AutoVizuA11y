/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		fallbackLng: "en-GB",
		debug: false,
		resources: {
			"en-GB": {
				translation: {
					alert:
						"You just entered an Autovizually chart. For information on how to interact with it, press the question mark key to open the shortcut guide",
					close_shortcut_guide_label: "Close shortcut guide",
					minimum: "Minimum",
					average: "Average",
					maximum: "Maximum",
					minimum_message: "The minimum is",
					average_message: "The average is",
					maximum_message: "The maximum is",
					median_message: "This is the median value.",
					shortcut_error: "This shortcut only works inside a chart",
					shortcut_error2: "That shortcut does not work in this chart",
					difference_below: "The value is {{ difference }} below the {{ code }}",
					difference_above: "The value is {{ difference }} above the {{ code }}",
					difference_same: "The value is the same as the {{ code }} value",
					highest_message: "This is {{ ordinalNumber }} highest value",
					lowest_message: "This is {{ ordinalNumber }} lowest value",
					sg_title: "Shortcut guide",
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
					generating_description: "Generating description...",
					alert_invalid_input_number: "Invalid input. Enter a number above 0.",
					alert_change_series_focused_only:
						"You can only change series while focused on a data point",
					alert_chart_single_series: "This chart only has one series of data",
					alert_already_at_data_level: "You are already at the data level",
					alert_already_at_chart_level: "You are already at the chart level",
					alert_jumping_data_points:
						"You are now jumping {{ count }} data points at a time inside the {{ type }}",
					prompt_enter_number: "Enter a number above 0:",
					// AI Prompt Templates
					prompt_longer_description:
						"Knowing that the chart below is from a {{context}} and the data represents {{title}}{{averageString}}, make a description (do not use abbreviations) with the trends in the data, starting with the conclusion: {{data}}",
					prompt_shorter_description: "Summarise (in less than 60 words) the following:",
					prompt_average_text: " with an average of ",
				},
			},
			"pt-PT": {
				translation: {
					alert:
						"Acabou de entrar num gráfico Autovizually. Para obter informações sobre como interagir com o mesmo, prima a tecla de ponto de interrogação para abrir o guia de atalhos.",
					close_shortcut_guide_label: "Fechar guia de atalhos",
					minimum: "o mínimo",
					average: "a média",
					maximum: "o máximo",
					minimum_message: "O mínimo é",
					average_message: "A média é",
					maximum_message: "O máximo é",
					median_message: "Este é o valor mediano.",
					shortcut_error: "Este atalho só funciona dentro de um gráfico",
					shortcut_error2: "Este atalho não funciona neste gráfico",
					difference_below: "O valor está {{ difference }} abaixo d{{ code }}",
					difference_above: "O valor está {{ difference }} acima d{{ code }}",
					difference_same: "O valor é o mesmo que {{ code }}",
					highest_message: "Este é o {{ ordinalNumber }} maior valor",
					lowest_message: "Este é o {{ ordinalNumber }} menor valor",
					sg_title: "Guia de atalhos",
					sg_access_title: "Aceder ao guia de atalhos",
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
					sg_define_jump_points: "Define o número de pontos de dados a serem avançados de cada vez",
					sg_add_jump_point:
						"Adiciona uma unidade ao número de pontos de dados a serem avançados de cada vez",
					sg_subtract_jump_point:
						"Subtrair um número aos pontos de dados a serem saltados de cada vez",
					sg_stats_nav_title: "Informações estatísticas (funciona ao navegar num gráfico)",
					sg_stats_focused_title:
						"Informações estatísticas (funciona quando um elemento do gráfico está focado)",
					sg_compare_minimum: "Comparar o elemento atual com o valor mínimo",
					sg_compare_average: "Comparar o elemento atual com o valor médio",
					sg_compare_maximum: "Comparar o elemento atual com o valor máximo",
					sg_compare_rest: "Comparar o elemento atual com o resto do gráfico",
					sg_change_desc_title: "Alterar descrições do gráfico",
					sg_longer_desc: "Definir descrição mais longa do gráfico",
					sg_shorter_desc: "Definir descrição mais curta do gráfico (padrão)",
					sg_description:
						"Guia de atalhos AutoVizually. O AutoVizually permite navegar entre gráficos e elementos de dados subjacentes usando apenas o teclado. Quando o foco está num gráfico, será fornecida uma descrição sobre os dados — poderá receber uma notificação indicando que a descrição do gráfico foi produzida por um modelo de IA. Para utilizadores de JAWS e NVDA, recomenda-se ativar o modo de Foco antes de navegar pelos dados usando as teclas de seta.",
					generating_description: "A gerar descrição...",
					alert_invalid_input_number: "Entrada inválida. Introduza um número superior a 0.",
					alert_change_series_focused_only:
						"Só é possível trocar de série quando focado num ponto de dados",
					alert_chart_single_series: "Este gráfico apenas tem uma série de dados",
					alert_already_at_data_level: "Já se encontra no nível dos dados",
					alert_already_at_chart_level: "Já está no nível dos gráficos",
					alert_jumping_data_points:
						"Está a saltar {{ count }} pontos de dados dentro do {{ type }}",
					prompt_enter_number: "Introduza um número superior a 0:",
					// AI Prompt Templates
					prompt_longer_description:
						"Sabendo que o gráfico abaixo é de um {{context}} e os dados representam {{title}}{{averageString}}, faça uma descrição (não use abreviações) com as tendências dos dados, começando com a conclusão: {{data}}",
					prompt_shorter_description: "Resuma (em menos de 60 palavras) o seguinte:",
					prompt_average_text: " com uma média de ",
				},
			},
		},
	});

export default i18n;
