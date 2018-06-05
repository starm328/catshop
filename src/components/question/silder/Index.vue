<template>
<div class="st-slider">
	<div class="slider-left"><span :style="{color: this.fillbg}" >{{parseInt(inputValue) + '%'}}</span></div>
	<div class="st-slider-blur" :class="sliderClass" tabindex="0"
		@focus="handleFocus" @blur="handleBlur"
		@touchstart="handleTouchStart" @touchend="handleTouchEnd"
		@touchcancel="handleTouchEnd"  @mousedown="handleMouseDown"
		@mouseup="handleMouseUp" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

		<div class="st-slider-display-value" v-if="displayValue" :style="displayValueStyle">
			<span class="display-value-text">{{value}}</span>
		</div>
		<input type="hidden" :name="name+'[type]'" value="range">
		<input type="hidden" :name="name+'[value]'" :value="inputValue">
		<div class="st-slider-track" :style="'background-color:'+ trakbg"></div>
		<div class="st-slider-fill" :style="{width:this.percent+'%','background-color': this.fillbg}"></div>
		<div class="st-slider-thumb" :style="thumbStyle">
			<focus-ripple v-if="(focused || hover) && !active"></focus-ripple>
		</div>
	</div>
	<div class="slider-right"><span :style="{color: this.trakbg}">{{(parseInt(100 - inputValue)) + '%'}}</span></div>
</div>
</template>

<script>
export default {
	name: 'st-slider',
	props: {
		name: {
			type: String
		},
		value: {
			type: [Number, String],
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		min: {
			type: Number,
			default: 0
		},
		step: {
			type: Number,
			default: 0.1
		},
		disabled: {
			type: Boolean,
			default: false
		},
		displayValue: {
			type: Boolean,
			default: true
		},
		trakbg: {
			type:String
		},
		fillbg: {
			type:String
		}
	},
	data () {
		return {
			inputValue: this.value,
			active: false,
			hover: false,
			focused: false,
			dragging: false
		}
	},
	computed: {
		percent () {
			let percentNum = (this.inputValue - this.min) / (this.max - this.min) * 100
			return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum
		},
		fillbgStyle() {
			return {
				'background-color': this.fillbg
			}
		},

		thumbStyle () {
			return {
				left: this.percent + '%'
			}
		},
		displayValueStyle () {
			return {
				left: this.percent + '%'
			}
		},
		sliderClass () {
			return {
				zero: this.inputValue <= this.min,
				active: this.active,
				disabled: this.disabled
			}
		}
	},
	created () {
		this.handleDragMouseMove = this.handleDragMouseMove.bind(this)
		this.handleMouseEnd = this.handleMouseEnd.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)
	},
	methods: {
		handleMouseDown (e) {
			if (this.disabled) return
			this.setValue(e)
			e.preventDefault()
			document.addEventListener('mousemove', this.handleDragMouseMove)
			document.addEventListener('mouseup', this.handleMouseEnd)
			this.$el.focus()
			this.onDragStart(e)
		},
		handleMouseUp () {
			if (this.disabled) return
			this.active = false
		},
		handleTouchStart (e) {
			if (this.disabled) return
			this.setValue(e.touches[0])
			document.addEventListener('touchmove', this.handleTouchMove)
			document.addEventListener('touchup', this.handleTouchEnd)
			document.addEventListener('touchend', this.handleTouchEnd)
			document.addEventListener('touchcancel', this.handleTouchEnd)
			e.preventDefault()
			this.onDragStart(e)
		},
		handleTouchEnd (e) {
			if (this.disabled) return
			document.removeEventListener('touchmove', this.handleTouchMove)
			document.removeEventListener('touchup', this.handleTouchEnd)
			document.removeEventListener('touchend', this.handleTouchEnd)
			document.removeEventListener('touchcancel', this.handleTouchEnd)
			this.onDragStop(e)
		},
		handleFocus () {
			if (this.disabled) return
			this.focused = true
		},
		handleBlur () {
			if (this.disabled) return
			this.focused = false
		},
		handleMouseEnter () {
			if (this.disabled) return
			this.hover = true
		},
		handleMouseLeave () {
			if (this.disabled) return
			this.hover = false
		},
		// 从点击位置更新 value
		setValue (e) {
			const { $el, max, min, step } = this
			let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (max - min)
			value = Math.round(value / step) * step + min
			value = parseFloat(value.toFixed(5))
			if (value > max) {
				value = max
			} else if (value < min) {
				value = min
			}
			this.inputValue = value
			this.$emit('change', value)
		},
		// 拖拽控制
		onDragStart (e) {
			this.dragging = true
			this.active = true
			this.$emit('dragStart', e)
			this.$emit('drag-start', e)
		},
		onDragUpdate (e) {
			if (this.dragRunning) return
			this.dragRunning = true
			window.requestAnimationFrame(() => {
				this.dragRunning = false
				if (!this.disabled) this.setValue(e)
			})
		},
		onDragStop (e) {
			this.dragging = false
			this.active = false
			this.$emit('dragStop', e)
			this.$emit('drag-stop', e)
		},
		handleDragMouseMove (e) {
			this.onDragUpdate(e)
		},
		handleTouchMove (e) {
			this.onDragUpdate(e.touches[0])
		},
		handleMouseEnd (e) {
			document.removeEventListener('mousemove', this.handleDragMouseMove)
			document.removeEventListener('mouseup', this.handleMouseEnd)
			this.onDragStop(e)
		}
	},
	watch: {
		value (val) {
			this.inputValue = val
		},
		inputValue (val) {
			this.$emit('input', val)
		}
	},

}
</script>

<style lang="less">
.st-slider{
	width:100%;
	padding:0 10px;
	display:flex;
	padding-top:10px;
	.slider-left{line-height:30px}
	.slider-right{line-height:30px}
	.st-slider-blur{
			width: 100%;
			border-radius:10px;
			margin:0 5%;
			position: relative;
			height: 24px;
			margin-bottom: 16px;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			cursor: default;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			outline: none;
			.st-slider-track {
			    background-color: #bdbdbd;
			}
			.st-slider-fill, .st-slider-track {
			    position: absolute;
			    height: 5px;
			    left: 0;
			    top: 50%;
			    margin-top: -1px;
			    border-radius:10px;
			}
			.st-slider-track {
			    right: 0;
			    background-color: #bdbdbd;
			    border:1px solid #912c2b
			}
			.st-slider-fill {
			    background-color: #2196f3;
			}
			.st-slider-thumb {
			    position: absolute;
			    top: 58%;
			    width: 20px;
			    height: 20px;
			    background-color: #7e57c2;
			    color: #7e57c2;
			    border-radius: 50%;
			    -webkit-transform: translate(-50%,-50%);
			    -ms-transform: translate(-50%,-50%);
			    transform: translate(-50%,-50%);
			    -webkit-transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);
			    transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);
			    cursor: pointer;
			}
			.st-slider-thumb {
			    background:url(./images/slider-img.png);
			    background-size:20px 20px;
			    color: #2196f3;
			}
	}
}
</style>
